import React, { useEffect } from 'react';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import '../src/index.css';

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      isAuthenticated
    }}>
      <div className='container'>
        <Router>
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
