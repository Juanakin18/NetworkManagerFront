import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UsersService from "./users/services/UsersService";
import UsersRepository from "./users/repositories/UsersRepository";

const root = ReactDOM.createRoot(document.getElementById('root'));

const usersRepository = new UsersRepository()
const usersService = new UsersService(usersRepository)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
