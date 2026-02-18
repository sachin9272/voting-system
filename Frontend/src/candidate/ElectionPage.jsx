import React, { useState } from "react";
import {
  LogOut,
  Info,
  CheckCircle
} from "lucide-react";

const candidatesData = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    party: "Reformist Union",
    desc: "15 years of leadership in regional development and sustainable infrastructure.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    party: "Innovation Party",
    desc: "Dedicated to digital transformation and transparent governance across all sectors.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    party: "Heritage Alliance",
    desc: "Focusing on community outreach and strengthening organizational integrity.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "James Wilson",
    party: "Independent",
    desc: "Pragmatic solutions for fiscal responsibility and long-term economic growth.",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    id: 5,
    name: "Amara Okafor",
    party: "Unity Collective",
    desc: "Advocating for inclusive policies and diversity within the executive board.",
    image: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: 6,
    name: "David Thorne",
    party: "Progressive Bloc",
    desc: "Focus on modernization of operational workflows and employee wellness.",
    image: "https://randomuser.me/api/portraits/men/12.jpg"
  }
];

export default function ElectionPage() {
  const [selected, setSelected] = useState(2);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">
            VC
          </div>
          <h1 className="text-xl font-semibold">VoteChain</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-medium">Robert Sterling</p>
            <p className="text-sm text-gray-500">ID: #8829-XJ</p>
          </div>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8">

        <h2 className="text-3xl font-bold mb-2">2024 General Election</h2>
        <p className="text-gray-600 max-w-3xl mb-6">
          Welcome, Robert. You are eligible to cast one vote for the position of
          <span className="font-semibold"> Executive Chairperson</span>. Please review the candidates below and make your selection.
          This action is final.
        </p>

        {/* Info Bar */}
        <div className="flex items-center gap-3 bg-blue-100 text-blue-700 p-4 rounded-lg mb-8">
          <Info size={20} />
          Polls close in 4 hours, 12 minutes. Ensure your vote is cast before the deadline.
        </div>

        {/* Candidate Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

          {candidatesData.map((candidate) => {
            const isSelected = selected === candidate.id;

            return (
              <div
                key={candidate.id}
                className={`bg-white rounded-xl shadow-sm p-6 text-center border transition
                  ${isSelected ? "border-green-500 shadow-md" : "border-gray-200"}`}
              >

                {/* Selected Badge */}
                {isSelected && (
                  <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full absolute mt-[-12px] ml-[-12px]">
                    YOUR SELECTION
                  </div>
                )}

                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{candidate.party}</p>

                <p className="text-gray-500 text-sm mb-6">
                  {candidate.desc}
                </p>

                {isSelected ? (
                  <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg flex justify-center items-center gap-2">
                    <CheckCircle size={18} />
                    Voted
                  </button>
                ) : (
                  <button
                    onClick={() => setSelected(candidate.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Vote
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t px-10 py-4 flex justify-between text-sm text-gray-500">
        <p>
          © 2024 Election Commission. All rights reserved. Your vote is encrypted and anonymous.
        </p>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-black">Privacy Policy</span>
          <span className="cursor-pointer hover:text-black">Election Rules</span>
          <span className="cursor-pointer hover:text-black">Help Desk</span>
        </div>
      </footer>
    </div>
  );
}
