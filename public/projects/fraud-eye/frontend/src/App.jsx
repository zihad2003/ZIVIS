import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Route';
import AuthStates from './Context/Auth/AuthStates';

function App() {
  return (
    <AuthStates>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthStates>
  );
}

export default App;
