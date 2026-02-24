import React from 'react';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../../src/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Elections', path: '/admin/elections', icon: CheckSquare },
        { label: 'Voters Verification', path: '/admin/voters', icon: Users },
        { label: 'Results', path: '/admin/results', icon: BarChart3 },
    ];

    return (
        <aside className="w-64 bg-white shadow-sm flex flex-col justify-between min-h-screen">
            <div>
                <div className="p-6 flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">VA</div>
                    <h1 className="text-xl font-bold text-blue-600">VoteAdmin</h1>
                </div>

                <nav className="mt-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <div
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition ${isActive
                                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="p-6 border-t">
                <p className="font-semibold">{user?.name || 'Admin User'}</p>
                <p className="text-sm text-gray-500 mb-4 capitalize">{user?.role || 'admin'}</p>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full px-3 py-2 rounded-lg transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
