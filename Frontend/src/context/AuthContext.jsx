import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getProfile } from "../api/authService";

const AuthContext = createContext(null);

/**
 * Provides authentication state (user, token, login/logout helpers) to the app.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);  // true while we re-hydrate from localStorage

    // On mount: if a token exists, try to re-fetch the user profile
    useEffect(() => {
        const hydrate = async () => {
            if (token) {
                try {
                    const profile = await getProfile(token);
                    setUser(profile);
                } catch {
                    // token is invalid / expired
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        hydrate();
    }, []); // run once on mount

    /**
     * Call this after a successful login / register response.
     * @param {{ _id, name, email, role, token }} authData
     */
    const saveAuth = useCallback((authData) => {
        localStorage.setItem("token", authData.token);
        setToken(authData.token);
        setUser({
            _id: authData._id,
            name: authData.name,
            email: authData.email,
            role: authData.role,
        });
    }, []);

    /** Clears all auth data and redirects to /login */
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, saveAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/** Hook to consume auth context anywhere in the component tree. */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
};
