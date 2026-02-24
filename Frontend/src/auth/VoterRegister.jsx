import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, UploadCloud } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authService';
import { useAuth } from '../context/AuthContext';

const VoterRegister = () => {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => fd.append(key, formData[key]));
      if (aadharFront) fd.append("aadharFront", aadharFront);
      if (aadharBack) fd.append("aadharBack", aadharBack);

      const data = await register(fd);
      saveAuth(data);
      navigate('/election');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Voter Registration</h2>
          <p className="text-blue-100 text-sm">Create an account to participate in the election</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><User size={20} /></span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name as per Aadhar"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><Mail size={20} /></span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><Phone size={20} /></span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><MapPin size={20} /></span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><Lock size={20} /></span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card (Front)</label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-3 text-center text-sm text-gray-500 hover:bg-gray-50">
                  <UploadCloud className="mx-auto mb-1 text-gray-400" size={20} />
                  {aadharFront ? aadharFront.name : "Upload Front Image"}
                  <input type="file" accept="image/*" onChange={e => setAadharFront(e.target.files[0])} className="hidden" required />
                </label>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card (Back)</label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-3 text-center text-sm text-gray-500 hover:bg-gray-50">
                  <UploadCloud className="mx-auto mb-1 text-gray-400" size={20} />
                  {aadharBack ? aadharBack.name : "Upload Back Image"}
                  <input type="file" accept="image/*" onChange={e => setAadharBack(e.target.files[0])} className="hidden" required />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 rounded-xl text-white font-semibold shadow-lg transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
                }`}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoterRegister;
