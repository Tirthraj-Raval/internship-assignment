import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from "../../components/user/navbar/navbar";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import Footer from "../../components/user/footer/footer";
import {GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, googleAuth } = useAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(name, email, password, mobile);
      window.location.href = '/HomePage';
    } catch (err) {
      setError('Error signing up. Try again.');
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; // Extract tokenId (credential)
      console.log('Google singup credential:', credential);
      // Call the googleAuth function with the tokenId
      await googleAuth({ tokenId: credential });
  
      // If googleAuth is successful, redirect the user
      alert('Google signup successful');
      window.location.href = '/';
    } catch (error) {
      console.error('Google signup failed:', error);
      alert('Google signup failed. Please try again.');
    }
  };
  

  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    console.error('Google signup failed:', error);
    alert('Google signup failed. Please try again.');
  };


  return (
    <GoogleOAuthProvider clientId="888965192911-v1tr02eq0iqnjt8k4dftmnuj4063kuid.apps.googleusercontent.com">
    <>
      <Helmet>
        <title>Sign Up | SaiFashionZone</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        
        <motion.div 
          className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden mt-32 mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 120
          }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-pink-600 mt-2">
                Explore the world of fashion with SaiFashionZone
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-pink-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-pink-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mobile Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="text-pink-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-600 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-pink-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 transform active:scale-95"
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </motion.button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
                <hr className="w-1/4 border border-gray-200" />
                <p className="text-gray-400">Or continue with</p>
                <hr className="w-1/4 border border-gray-200" />
              </div>

              {/* Google Login Button */}
              <div className="mt-4 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  useOneTap
                />
              </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account? 
                <a href="/login" className="text-pink-600 hover:text-pink-800 ml-2 font-semibold">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
    </GoogleOAuthProvider>
  );
}