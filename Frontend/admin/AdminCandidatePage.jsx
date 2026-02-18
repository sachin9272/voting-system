import React from "react";
import {
  LayoutDashboard,
  UserPlus,
  BarChart3,
  Users,
  Settings,
  Shield,
  Bell,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";

export default function AdminCandidatePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= Sidebar ================= */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">VA</div>
            <h1 className="text-xl font-bold text-blue-600">VoteAdmin</h1>
          </div>

          <nav className="mt-6 space-y-2">

            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <LayoutDashboard size={18} />
              Dashboard
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-600 border-r-4 border-blue-600 cursor-pointer">
              <UserPlus size={18} />
              Add Candidate
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-600 border-r-4 border-blue-600 cursor-pointer">
              <UserPlus size={18} />
              Create New Election
            </div>

            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <BarChart3 size={18} />
              Results
            </div>

            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <Users size={18} />
              Voters List
            </div>

            <p className="px-6 pt-6 text-gray-400 text-sm">SETTINGS</p>

            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <Settings size={18} />
              Configuration
            </div>

            <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 cursor-pointer">
              <Shield size={18} />
              Security
            </div>

          </nav>
        </div>

        <div className="p-6 border-t">
          <p className="font-semibold">Robert Wilson</p>
          <p className="text-sm text-gray-500">Super Admin</p>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Candidate Management</h2>
            <p className="text-gray-500">
              Register and manage official candidates for the upcoming professional election.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-500" />
            <p className="text-gray-600">Election: Board of Directors 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* ================= Add Candidate Form ================= */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Candidate</h3>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Political Party / Affiliation
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Select Affiliation</option>
                  <option>Global Innovation</option>
                  <option>Independent</option>
                  <option>Strategy First</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Profile Photo
                </label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center text-gray-500">
                  Upload a file or drag and drop <br />
                  <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                <Plus size={18} />
                Register Candidate
              </button>

            </div>
          </div>

          {/* ================= Candidate Table ================= */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">

            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Registered Candidates List</h3>
              <input
                type="text"
                placeholder="Search candidates..."
                className="border px-3 py-2 rounded-lg"
              />
            </div>

            <table className="w-full text-left">
              <thead className="text-gray-500 text-sm border-b">
                <tr>
                  <th className="py-2">Candidate</th>
                  <th>Affiliation</th>
                  <th>Votes</th>
                  <th>Verification</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                <tr className="py-4">
                  <td className="py-4 font-medium">Sarah Jenkins</td>
                  <td>Global Innovation</td>
                  <td className="font-semibold">1,245</td>
                  <td className="text-green-600 flex items-center gap-1">
                    <CheckCircle size={16} />
                    Verified
                  </td>
                  <td className="flex gap-3">
                    <Pencil size={16} className="cursor-pointer text-blue-500" />
                    <Trash2 size={16} className="cursor-pointer text-red-500" />
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-medium">Emily Rodriguez</td>
                  <td>Strategy First</td>
                  <td className="font-semibold">2,104</td>
                  <td className="text-yellow-600 flex items-center gap-1">
                    <Clock size={16} />
                    Pending
                  </td>
                  <td className="flex gap-3">
                    <Pencil size={16} className="cursor-pointer text-blue-500" />
                    <Trash2 size={16} className="cursor-pointer text-red-500" />
                  </td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>

        {/* ================= Bottom Cards ================= */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          <div className="bg-blue-600 text-white rounded-xl p-6 col-span-1">
            <p>Total Candidates</p>
            <h2 className="text-3xl font-bold mt-2">24</h2>
            <p className="text-sm mt-2">+3 from yesterday</p>
          </div>

          <div className="col-span-2 bg-gray-900 text-white rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Administrative Tip</h3>
              <p className="text-sm text-gray-300 mt-2">
                All new candidate profiles require manual verification before they appear on the public ballot.
              </p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg">
              Learn More
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
