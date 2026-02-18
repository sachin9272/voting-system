import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { FaChartBar, FaUsers, FaBullhorn, FaCog } from "react-icons/fa";

const CandidateDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1220] border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">VoteCentral</h1>

          <nav className="space-y-4">
            <SidebarItem active icon={<FaChartBar />} text="Overview" />
            <SidebarItem icon={<FaChartBar />} text="Detailed Analytics" />
            <SidebarItem icon={<FaUsers />} text="Supporter List" />
            <SidebarItem icon={<FaBullhorn />} text="Campaign Media" />
            <SidebarItem icon={<FaCog />} text="Settings" />
          </nav>
        </div>

        <div className="flex items-center gap-3 mt-10">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Jonathan Vance</p>
            <p className="text-xs text-gray-400">ID: 4829-X</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Candidate Overview</h2>
            <p className="text-gray-400">
              Real-time performance metrics for City Council District 4.
            </p>
          </div>

          <div className="flex gap-4">
            <span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm">
              ● LIVE POLLS OPEN
            </span>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              <FiRefreshCw />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-[#1e293b] p-8 rounded-2xl shadow-lg">
          <p className="text-blue-400 text-sm mb-2">
            LIVE RANK: 1ST PLACE • Updated 2 mins ago
          </p>

          <h1 className="text-6xl font-bold mb-2">142,805</h1>
          <p className="text-green-400 font-semibold">+12.4%</p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <SmallCard title="Vote Share" value="48.2%" />
            <SmallCard title="Margin of Lead" value="18,402" />
            <SmallCard title="Projected Outcome" value="Victory (94%)" />
          </div>
        </div>

        {/* Trend + Profile Section */}
        <div className="grid grid-cols-3 gap-8">

          {/* Chart Section */}
          <div className="col-span-2 bg-[#1e293b] p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">
              Vote Acquisition Trend
            </h3>

            <div className="h-64 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl flex items-end p-4">
              <div className="w-full h-40 bg-blue-600 rounded-xl opacity-40"></div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-[#1e293b] p-8 rounded-2xl text-center">
            <img
              src="https://i.pravatar.cc/100"
              alt="candidate"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">Jonathan Vance</h3>
            <p className="text-blue-400 mb-4">Candidate for City Council</p>

            <div className="bg-[#0f172a] p-4 rounded-xl text-sm text-gray-300">
              Former urban planner with 15 years experience in sustainable
              development and community programs.
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`}
  >
    {icon}
    <span>{text}</span>
  </div>
);

const SmallCard = ({ title, value }) => (
  <div className="bg-[#0f172a] p-4 rounded-xl">
    <p className="text-gray-400 text-sm">{title}</p>
    <h4 className="text-xl font-bold mt-2">{value}</h4>
  </div>
);

export default CandidateDashboard;
