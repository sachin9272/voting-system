import React, { useEffect, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { useAuth } from '../src/context/AuthContext';
import { getElections, createElection, startElection, stopElection, addCandidate } from '../src/api/electionService';
import { Play, Square, Plus, Users, Calendar } from 'lucide-react';

const AdminElections = () => {
    const { token } = useAuth();
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newElection, setNewElection] = useState({ title: '', description: '', startDate: '', endDate: '' });

    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [selectedElection, setSelectedElection] = useState(null);
    const [candidateData, setCandidateData] = useState({ name: '', email: '', password: '', party: '', bio: '' });
    const [partySymbol, setPartySymbol] = useState(null);
    const [photo, setPhoto] = useState(null);

    const fetchElections = async () => {
        setLoading(true);
        try {
            const data = await getElections(token);
            setElections(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleCreateElection = async (e) => {
        e.preventDefault();
        try {
            await createElection(newElection, token);
            setShowCreateModal(false);
            fetchElections();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            Object.keys(candidateData).forEach(key => fd.append(key, candidateData[key]));
            if (partySymbol) fd.append("partySymbol", partySymbol);
            if (photo) fd.append("photo", photo);

            await addCandidate(selectedElection._id, fd, token);
            setShowCandidateModal(false);
            fetchElections();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            if (currentStatus === 'upcoming' || currentStatus === 'stopped') {
                await startElection(id, token);
            } else if (currentStatus === 'active') {
                await stopElection(id, token);
            }
            fetchElections();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Manage Elections</h2>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
                    >
                        <Plus size={20} /> Create New Election
                    </button>
                </div>

                <div className="grid gap-6">
                    {loading ? (
                        <p className="text-gray-500">Loading elections...</p>
                    ) : elections.length === 0 ? (
                        <p className="text-gray-500 bg-white p-6 rounded-xl border border-dashed border-gray-300">No elections found. Create one to get started.</p>
                    ) : (
                        elections.map((election) => (
                            <div key={election._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4 border border-gray-100">
                                <div className="flex justify-between items-start border-b pb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">{election.title}</h3>
                                        <p className="text-gray-500">{election.description}</p>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize
                                            ${election.status === 'active' ? 'bg-green-100 text-green-700' :
                                                election.status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {election.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2"><Calendar size={16} /> Start: {new Date(election.startDate).toLocaleDateString()}</div>
                                        <div className="flex items-center gap-2"><Calendar size={16} /> End: {new Date(election.endDate).toLocaleDateString()}</div>
                                        <div className="flex items-center gap-2"><Users size={16} /> Candidates: {election.candidates?.length}</div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                setSelectedElection(election);
                                                setShowCandidateModal(true);
                                            }}
                                            className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                                        >
                                            + Add Candidate
                                        </button>

                                        {(election.status === 'upcoming' || election.status === 'stopped') && (
                                            <button
                                                onClick={() => handleStatusToggle(election._id, election.status)}
                                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                            >
                                                <Play size={16} /> Start Voting
                                            </button>
                                        )}

                                        {election.status === 'active' && (
                                            <button
                                                onClick={() => handleStatusToggle(election._id, election.status)}
                                                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                <Square size={16} /> Stop Voting
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {election.candidates?.length > 0 && (
                                    <div className="mt-4 pt-4 border-t bg-gray-50 p-4 rounded-xl">
                                        <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Registered Candidates</h4>
                                        <div className="grid grid-cols-4 gap-4">
                                            {election.candidates.map(candidate => (
                                                <div key={candidate._id} className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                                                    {candidate.photo ? (
                                                        <img src={`http://localhost:5000${candidate.photo}`} className="w-10 h-10 object-cover rounded-full" />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">IMG</div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-sm">{candidate.name}</p>
                                                        <p className="text-xs text-gray-500">{candidate.party}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Election Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4">Create New Election</h3>
                        <form onSubmit={handleCreateElection} className="space-y-4">
                            <input className="w-full border rounded-lg p-3" placeholder="Election Title" required
                                value={newElection.title} onChange={e => setNewElection({ ...newElection, title: e.target.value })} />
                            <textarea className="w-full border rounded-lg p-3" placeholder="Description" rows={3}
                                value={newElection.description} onChange={e => setNewElection({ ...newElection, description: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                                    <input type="datetime-local" className="w-full border rounded-lg p-3" required
                                        value={newElection.startDate} onChange={e => setNewElection({ ...newElection, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                                    <input type="datetime-local" className="w-full border rounded-lg p-3" required
                                        value={newElection.endDate} onChange={e => setNewElection({ ...newElection, endDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t mt-4">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Candidate Modal */}
            {showCandidateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-bold mb-4">Add Candidate: {selectedElection?.title}</h3>
                        <form onSubmit={handleAddCandidate} className="space-y-4">
                            <input className="w-full border rounded-lg p-3" placeholder="Full Name" required
                                value={candidateData.name} onChange={e => setCandidateData({ ...candidateData, name: e.target.value })} />
                            <input className="w-full border rounded-lg p-3" type="email" placeholder="Email Address" required
                                value={candidateData.email} onChange={e => setCandidateData({ ...candidateData, email: e.target.value })} />
                            <input className="w-full border rounded-lg p-3" type="password" placeholder="Temporary Password" required
                                value={candidateData.password} onChange={e => setCandidateData({ ...candidateData, password: e.target.value })} />
                            <input className="w-full border rounded-lg p-3" placeholder="Political Party" required
                                value={candidateData.party} onChange={e => setCandidateData({ ...candidateData, party: e.target.value })} />
                            <textarea className="w-full border rounded-lg p-3" placeholder="Biography" rows={2}
                                value={candidateData.bio} onChange={e => setCandidateData({ ...candidateData, bio: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Candidate Photo</label>
                                    <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full text-sm border p-2 rounded-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Party Symbol</label>
                                    <input type="file" accept="image/*" onChange={e => setPartySymbol(e.target.files[0])} className="w-full text-sm border p-2 rounded-lg bg-gray-50" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t mt-4">
                                <button type="button" onClick={() => setShowCandidateModal(false)} className="flex-1 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Candidate</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminElections;
