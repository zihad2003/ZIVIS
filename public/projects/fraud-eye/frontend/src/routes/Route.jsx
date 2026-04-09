import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import AnalyticsPage from '../Pages/AnalyticsPage';
import AnalyzePage from '../Pages/AnalyzePage';
import LoginPage from '../Pages/LoginPage';
import ScrollToTop from '../components/ScrollToTop';
import { useContext } from 'react';
import { AuthContext } from '../Context/Auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicHome = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/analyze" replace /> : <HomePage />;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PublicHome />} />
        <Route path="/home" element={<PublicHome />} />
        <Route path="/analyze" element={<PrivateRoute><AnalyzePage /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
