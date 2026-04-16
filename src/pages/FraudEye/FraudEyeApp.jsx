// FraudEye — ported from https://github.com/Axshatt/fraud-eye
// Integrated into ZIVIS with dark glassmorphism theme override
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthStates from './context/AuthStates';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import './fraud-eye-dark.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/fraudeye/login" replace />;
};

const PublicHome = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/fraudeye/analyze" replace /> : <HomePage />;
};

function FraudEyeRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/analyze" element={<PrivateRoute><AnalyzePage /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/fraudeye" replace />} />
      </Routes>
    </>
  );
}

export default function FraudEyeApp() {
  return (
    <AuthStates>
      <FraudEyeRoutes />
    </AuthStates>
  );
}
