import React, { useEffect, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { useAuth } from '../src/context/AuthContext';
import { getElections, getElectionResults } from '../src/api/electionService';
import { Trophy, Users, BarChart } from 'lucide-react';

const AdminResults = () => {
    const { token } = useAuth();
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const data = await getElections(token);
                // Only show results for stopped or completed elections 
                // OR you can allow active too, so admin can see live stats. I'll allow all for now.
                setElections(data);
                if (data.length > 0) {
                    setSelectedElection(data[0]._id);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchElections();
    }, [token]);

    useEffect(() => {
        if (selectedElection) {
            const fetchResults = async () => {
                try {
                    const data = await getElectionResults(selectedElection, token);
                    setResults(data);
                } catch (err) {
                    console.error("Failed to load results", err);
                }
            };
            fetchResults();
        }
    }, [selectedElection, token]);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <AdminSidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8 border-b pb-6">
                    <div>
                        <h2 className="text-3xl font-bold">Election Results</h2>
                        <p className="text-gray-500 mt-2">View live or final voting tallies for each election.</p>
                    </div>

                    <select
                        value={selectedElection}
                        onChange={(e) => setSelectedElection(e.target.value)}
                        className="p-3 border rounded-xl shadow-sm text-lg font-semibold min-w-[250px] bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {elections.map((el) => (
                            <option key={el._id} value={el._id}>{el.title} ({el.status})</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-lg">Loading election data...</p>
                ) : !results ? (
                    <p className="text-gray-500 text-lg">Please select an election to view results.</p>
                ) : (
                    <div>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="p-4 bg-blue-100 text-blue-600 rounded-full"><Users size={32} /></div>
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold">Total Votes Cast</p>
                                    <h3 className="text-4xl font-bold">{results.totalVotes}</h3>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="p-4 bg-green-100 text-green-600 rounded-full"><Trophy size={32} /></div>
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold">Current Leader</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {results.results?.length > 0 && results.results[0].voteCount > 0
                                            ? results.results[0].name
                                            : "No votes yet"}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b bg-gray-50 flex items-center gap-2">
                                <BarChart size={20} className="text-gray-500" />
                                <h3 className="text-xl font-bold text-gray-800">Detailed Leaderboard</h3>
                            </div>

                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100/50 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="py-4 px-6">Rank</th>
                                        <th className="py-4 px-6">Candidate</th>
                                        <th className="py-4 px-6">Party</th>
                                        <th className="py-4 px-6 text-right">Votes</th>
                                        <th className="py-4 px-6 text-right">Share (%)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {results.results?.map((candidate, index) => (
                                        <tr key={candidate._id} className="hover:bg-gray-50 transition">
                                            <td className="py-4 px-6 font-bold text-gray-500">#{index + 1}</td>
                                            <td className="py-4 px-6 font-semibold flex items-center gap-3">
                                                {candidate.photo ? (
                                                    <img src={`http://localhost:5000${candidate.photo}`} className="w-10 h-10 object-cover rounded-full border shadow-sm" />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                                )}
                                                {candidate.name}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{candidate.party}</td>
                                            <td className="py-4 px-6 text-right font-bold text-lg text-blue-600">{candidate.voteCount}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                            style={{ width: `${candidate.percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-medium text-sm text-gray-600 min-w-[40px]">{candidate.percentage}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {results.results?.length === 0 && (
                                <div className="p-8 text-center text-gray-500">No candidates found for this election.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminResults;
