// This is the global base URL for the API. 
// It falls back to '/api' which will be proxied by Vite in dev, and Vercel in prod.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
