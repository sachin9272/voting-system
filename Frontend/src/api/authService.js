// Base URL is proxied by Vite → http://localhost:5000
const BASE_URL = "/api/auth";

/**
 * Registers a new voter via FormData (supports Aadhar uploads).
 * @param {FormData} formData
 */
export const register = async (formData) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        body: formData, // No Content-Type header needed for FormData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
};

/**
 * Logs in an existing user / candidate / admin.
 * @param {{ email: string, password: string }} data
 */
export const login = async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
};

/**
 * Fetches the authenticated user's profile.
 * @param {string} token  JWT token
 */
export const getProfile = async (token) => {
    const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
    return data;
};
