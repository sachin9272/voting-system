import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import VoterLogin from './auth/VoterLogin'
import VoterRegister from './auth/VoterRegister'

import ElectionPage from './candidate/ElectionPage'
import CandidateDashboard from './candidate/CandidateDashboard'

import AdminDashboard from '../admin/AdminDashboard'
import AdminElections from '../admin/AdminElections'
import AdminVoters from '../admin/AdminVoters'
import AdminResults from '../admin/AdminResults'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Default → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<VoterLogin />} />
        <Route path="/register" element={<VoterRegister />} />

        {/* Protected: voters */}
        <Route
          path="/election"
          element={
            <ProtectedRoute allowedRoles={["voter", "admin", "candidate"]}>
              <ElectionPage />
            </ProtectedRoute>
          }
        />

        {/* Protected: candidates */}
        <Route
          path="/CandidateDashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate", "admin"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected: admin */}
        <Route
          path="/admin"
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections"
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
              <AdminElections />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/admin/voters"
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
              <AdminVoters />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
              <AdminResults />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
