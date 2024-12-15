import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin component

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Axios instance with default configurations
  const api = axios.create({
    baseURL: 'https://ecommercebackend-8gx8.onrender.com', // Backend URL
    withCredentials: true, // Include cookies in requests
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setUser(null); // Clear user state if session expired
    }
  }, []);

  const signup = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    const { userId } = response.data;

    // Store userId in sessionStorage
    sessionStorage.setItem('userId', userId);

    setUser({ name, email, userId });
    return userId;
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.message === 'Login successful') {
        const { userId } = response.data;

        // Save userId in sessionStorage
        sessionStorage.setItem('userId', userId);

        // Update the state with the logged-in user
        setUser({ email, userId });

        return 'Login successful';
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      if (err.response?.data?.error === 'Account is suspended') {
        alert('Your account is suspended from further notice due to unusual activity');
      } else if (err.response?.data?.error === 'Account is blocked') {
        alert('Your account has been terminated');
      }
      console.error('Login error:', err.response?.data?.error || err.message);
      throw err;
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  const fetchUserName = async (userId) => {
    const response = await api.get(`/auth/user/${userId}`);
    return response.data.name;
  };

  // Google Authentication function
const googleAuth = async (response) => {
  try {
    const { tokenId } = response;

    if (!tokenId) {
      throw new Error("No tokenId provided in the Google response.");
    }

    // Send the tokenId to your backend for verification
    const res = await api.post('/auth/google-login', {
      tokenId, // Include the tokenId in the request body
    });

    // Extract user details from the backend response
    const { userId, name, email } = res.data;

    if (!userId || !name || !email) {
      throw new Error("Incomplete user information received from the backend.");
    }

    // Store userId in sessionStorage
    sessionStorage.setItem('userId', userId);

    // Update the state with the logged-in user
    setUser({ name, email, userId });

    return 'Google login successful';
  } catch (err) {
    console.error('Google login error:', err.response?.data?.error || err.message);

    // Provide a user-friendly error message
    throw new Error("Google login failed. Please try again later.");
  }
};


  return (
    <AuthContext.Provider value={{ user, signup, login, logout, fetchUserName, googleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
