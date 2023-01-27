import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import AuthProvider from './context/auth/AuthProvider';
import { UserProvider } from './context/auth/UserProvider';
import { UsersProvider } from './context/auth/usersContext/UsersProvider';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <UsersProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UsersProvider>

      </UserProvider>


    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
