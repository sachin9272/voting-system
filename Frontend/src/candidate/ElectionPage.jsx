import React, { useEffect, useState } from "react";
import { LogOut, Info, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getElections } from "../api/electionService";
import { castVote, getMyVotes } from "../api/voteService";

export default function ElectionPage() {
  const [activeElection, setActiveElection] = useState(null);
  const [myVotes, setMyVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const allElections = await getElections(token);
      const votes = await getMyVotes(token);

      // Filter to only show active elections (or upcoming for info)
      // but let's prioritize the first active one for voting
      const active = allElections.find(e => e.status === "active");

      setActiveElection(active || allElections[0]);
      setMyVotes(votes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleVote = async (candidateId) => {
    if (!window.confirm("Are you sure? This vote is final.")) return;

    try {
      await castVote(activeElection._id, candidateId, token);
      alert("Vote cast successfully!");
      fetchData(); // Refresh UI
    } catch (err) {
      alert(err.message);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "Voter";

  // Check if voter has already voted in the active election
  const hasVotedInActive = activeElection
    ? myVotes.some(v => v.election._id === activeElection._id)
    : false;

  const votedCandidateId = hasVotedInActive
    ? myVotes.find(v => v.election._id === activeElection._id)?.candidate._id
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-blue-400 font-bold tracking-wider">
            VC
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 font-extrabold text-transparent bg-clip-text">VoteCentral</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs font-medium text-blue-600 capitalize bg-blue-100 px-2 py-0.5 rounded shadow-sm inline-block mt-1">
              {user?.role} {user?.role === 'voter' && (user?.isVerified ? " (Verified)" : " (Unverified)")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border-2 border-gray-200 px-4 py-2 rounded-xl text-gray-600 font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 px-10 py-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <p className="text-center text-gray-500 font-medium">Loading election data...</p>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border-2 border-red-200 font-semibold flex items-center gap-3">
            <AlertCircle /> {error}
          </div>
        ) : !activeElection ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No active elections</h2>
            <p className="text-gray-500">There are currently no elections available.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{activeElection.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                Welcome, <span className="font-semibold text-blue-600">{firstName}</span>. {activeElection.description}
              </p>
            </div>

            {user?.role === 'voter' && !user?.isVerified && (
              <div className="flex justify-between items-center bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-sm mb-8">
                <div className="flex items-start gap-4 text-yellow-800">
                  <AlertCircle size={28} className="text-yellow-600" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Account Pending Verification</h3>
                    <p>Your Aadhar card is currently being reviewed by an administrator. You cannot cast a vote until you are verified.</p>
                  </div>
                </div>
              </div>
            )}

            {activeElection.status !== "active" && (
              <div className="flex justify-between items-center bg-blue-50 border border-blue-200 text-blue-800 p-5 rounded-xl mb-8 shadow-sm">
                <div className="flex items-center gap-3"><Info size={24} /> <span className="font-semibold text-lg">Voting is closed. Status: {activeElection.status}</span></div>
              </div>
            )}

            {hasVotedInActive && (
              <div className="flex justify-between items-center bg-green-50 border-2 border-green-200 text-green-800 p-6 rounded-2xl mb-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle size={28} className="text-green-600" />
                  <div>
                    <span className="font-bold text-xl block">Vote Casted Successfully</span>
                    <span className="text-green-700 font-medium mt-1 inline-block">Thank you for participating in the election! Your digital signature has been recorded.</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {activeElection.candidates?.map((candidate) => {
                const isSelected = votedCandidateId === candidate._id;

                return (
                  <div
                    key={candidate._id}
                    className={`bg-white rounded-3xl p-6 text-center border-2 transition-all duration-300 relative group overflow-hidden
                      ${isSelected ? "border-green-500 shadow-xl bg-green-50/30 transform scale-105" : "border-gray-100 shadow hover:shadow-2xl hover:-translate-y-1 block"}`}
                  >
                    {isSelected && (
                      <div className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full absolute top-4 left-4 shadow-md flex items-center gap-1">
                        <CheckCircle size={14} /> YOUR VOTE
                      </div>
                    )}

                    <div className="relative inline-block mt-4 mb-4">
                      {candidate.photo ? (
                        <img
                          src={`http://localhost:5000${candidate.photo}`}
                          alt={candidate.name}
                          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white shadow-lg mx-auto"></div>
                      )}
                      {candidate.partySymbol && (
                        <img
                          src={`http://localhost:5000${candidate.partySymbol}`}
                          alt={candidate.party}
                          className="w-10 h-10 rounded-full bg-white p-1 absolute bottom-0 right-0 shadow-md border"
                        />
                      )}
                    </div>

                    <h3 className="font-black text-xl text-gray-800 mb-1">{candidate.name}</h3>
                    <p className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-4">{candidate.party}</p>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed px-2">
                      {candidate.bio || "No biography provided by this candidate."}
                    </p>

                    {activeElection.status === "active" && user?.role === 'voter' && user?.isVerified && !hasVotedInActive && (
                      <button
                        onClick={() => handleVote(candidate._id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 border border-blue-700"
                      >
                        Vote for {candidate.name.split(" ")[0]}
                      </button>
                    )}

                    {isSelected && (
                      <div className="w-full bg-green-100 text-green-700 font-bold py-3.5 rounded-xl border border-green-200 flex justify-center items-center gap-2 shadow-inner">
                        <CheckCircle size={20} /> Voted
                      </div>
                    )}
                  </div>
                );
              })}

              {activeElection.candidates?.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed rounded-3xl">
                  <p className="text-xl font-medium">No candidates registered for this election yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
