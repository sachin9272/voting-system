import React, { useEffect, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { useAuth } from '../src/context/AuthContext';
import { getVoters, verifyVoter, rejectVoter } from '../src/api/adminService';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const AdminVoters = () => {
    const { token } = useAuth();
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVoter, setSelectedVoter] = useState(null);

    const fetchVoters = async () => {
        setLoading(true);
        try {
            const data = await getVoters(token);
            setVoters(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleVerify = async (id) => {
        try {
            await verifyVoter(id, token);
            fetchVoters();
            setSelectedVoter(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectVoter(id, token);
            fetchVoters();
            setSelectedVoter(null);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-6">Voter Verification Management</h2>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-4 px-6 font-semibold text-gray-600">Name</th>
                                <th className="py-4 px-6 font-semibold text-gray-600">Email</th>
                                <th className="py-4 px-6 font-semibold text-gray-600">Status</th>
                                <th className="py-4 px-6 font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-8">Loading voters...</td></tr>
                            ) : voters.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No voters found.</td></tr>
                            ) : (
                                voters.map((voter) => (
                                    <tr key={voter._id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-medium">{voter.name}</td>
                                        <td className="py-4 px-6 text-gray-600">{voter.email}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${voter.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {voter.isVerified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => setSelectedVoter(voter)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                                            >
                                                <Eye size={18} /> View Aadhar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aadhar Review Modal */}
            {selectedVoter && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-bold">Review Voter: {selectedVoter.name}</h3>
                            <button onClick={() => setSelectedVoter(null)} className="text-gray-400 hover:text-black">✕</button>
                        </div>

                        <div className="p-6 grid grid-cols-2 gap-6 bg-gray-50">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-2">Aadhar Front</p>
                                {selectedVoter.aadharFront ? (
                                    <img src={`http://localhost:5000${selectedVoter.aadharFront}`} alt="Aadhar Front" className="w-full h-auto rounded-lg border shadow-sm" />
                                ) : (
                                    <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">No image</div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-2">Aadhar Back</p>
                                {selectedVoter.aadharBack ? (
                                    <img src={`http://localhost:5000${selectedVoter.aadharBack}`} alt="Aadhar Back" className="w-full h-auto rounded-lg border shadow-sm" />
                                ) : (
                                    <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">No image</div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 flex justify-end gap-4 border-t">
                            <button
                                onClick={() => handleReject(selectedVoter._id)}
                                className="flex items-center gap-2 px-6 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
                            >
                                <XCircle size={18} /> Reject
                            </button>
                            <button
                                onClick={() => handleVerify(selectedVoter._id)}
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg shadow-green-200"
                            >
                                <CheckCircle size={18} /> Verify Voter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVoters;
