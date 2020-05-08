import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import '../src/index.css';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  const routes = useRoutes(false);

  return (
    <div className='container'>
      <Router>
        {routes}
      </Router>
    </div>
  )
}

export default App;
