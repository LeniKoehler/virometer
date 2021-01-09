import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';

import App from './app/app';
import { initialState } from "./app/state/state";

// Set an initial global state directly:
setGlobal(initialState);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
