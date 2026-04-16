import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';

const HomePage = () => {
  const navigate = useNavigate();
  // onSampleLoad navigates to the analyze page so user can try a sample
  const handleSampleLoad = () => navigate('/fraudeye/analyze');

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        <Hero onSampleLoad={handleSampleLoad} />
        <FAQ />
      </div>
    </MainLayout>
  );
};

export default HomePage;
