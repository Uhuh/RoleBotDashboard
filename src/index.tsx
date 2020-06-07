import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as config from 'dotenv';
import App from './modules';
config.config();

ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('app')
);