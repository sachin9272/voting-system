import React from 'react'
import { Routes, Route, Router, Navigate } from 'react-router-dom'
import VoterLogin from './auth/VoterLogin'
import VoterRegister from './auth/VoterRegister'
import ElectionPage from './candidate/ElectionPage'
import AdminCandidatePage from '../admin/AdminCandidatePage'
import CreateElectionPage from '../admin/CreateElectionPage'
import CandidateDashboard from './candidate/CandidateDashboard'

const App = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login Page */}
      <Route path="/login" element={<VoterLogin />} />

      {/* Register Page */}
      <Route path="/register" element={<VoterRegister />} />

      {/* election page */}
      <Route path="/election" element={<ElectionPage/>} />

      {/* AdminCandidate Page */}
      <Route path="/AdminCandidate" element={<AdminCandidatePage/>} />

      {/* CreateElection Page */}
      <Route path="/CreateElection" element={<CreateElectionPage/>} />

      {/* CandidateDashboard Page */}
      <Route path="/CandidateDashboard" element={<CandidateDashboardPage/>} />
      

        
      



    </Routes>
  )
}

export default App
