const BASE_URL = "/api/votes";

const getHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

export const castVote = async (electionId, candidateId, token) => {
    const res = await fetch(`${BASE_URL}/cast`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ electionId, candidateId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to cast vote");
    return data;
};

export const getMyVotes = async (token) => {
    const res = await fetch(`${BASE_URL}/my-votes`, {
        headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch your votes");
    return data;
};
