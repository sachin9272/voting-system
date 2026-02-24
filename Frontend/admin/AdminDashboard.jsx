import React, { useEffect, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { useAuth } from '../src/context/AuthContext';
import { getElections } from '../src/api/electionService';
import { getVoters } from '../src/api/adminService';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState({ elections: 0, candidates: 0, voters: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [elections, voters] = await Promise.all([
                    getElections(token),
                    getVoters(token)
                ]);

                const candidateCount = elections.reduce((sum, el) => sum + (el.candidates?.length || 0), 0);

                setStats({
                    elections: elections.length,
                    candidates: candidateCount,
                    voters: voters.length,
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-8">Admin Dashboard Overview</h2>

                {loading ? (
                    <p className="text-gray-500">Loading statistics...</p>
                ) : (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm font-semibold mb-2">Total Elections</p>
                            <h3 className="text-4xl font-bold text-blue-600">{stats.elections}</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm font-semibold mb-2">Total Candidates</p>
                            <h3 className="text-4xl font-bold text-green-600">{stats.candidates}</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm font-semibold mb-2">Total Registered Voters</p>
                            <h3 className="text-4xl font-bold text-purple-600">{stats.voters}</h3>
                        </div>
                    </div>
                )}

                <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-xl">
                    <h4 className="font-semibold text-lg mb-2">Quick Actions</h4>
                    <p className="text-sm">
                        Use the sidebar to navigate to the Elections tab to manage voting sessions and add candidates,
                        or go to Voter Verification to verify newly registered voters by checking their Aadhar details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
