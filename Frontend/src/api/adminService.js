import { API_BASE_URL } from "./config";
const BASE_URL = `${API_BASE_URL}/auth/voters`;

const getHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

export const getVoters = async (token) => {
    const res = await fetch(BASE_URL, { headers: getHeaders(token) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch voters");
    return data;
};

export const verifyVoter = async (voterId, token) => {
    const res = await fetch(`${BASE_URL}/${voterId}/verify`, {
        method: "PUT",
        headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to verify voter");
    return data;
};

export const rejectVoter = async (voterId, token) => {
    const res = await fetch(`${BASE_URL}/${voterId}/reject`, {
        method: "PUT",
        headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to reject voter");
    return data;
};
