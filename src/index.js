import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UsersService from "./services/UsersService";
import UsersRepository from "./repositories/UsersRepository";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));

const usersRepository = new UsersRepository()
const usersService = new UsersService(usersRepository)
 const theme = createTheme({
     breakpoints: {
         values: {
             xs: 0,
             xsm: 50,
             sm: 600,
             md: 900,
             lg: 1200,
             xl: 1536,
         },
     },
     palette:{
         primary:{
             main:"#dadada",
             text:"#FFFFFF"
         },
         secondary:{
             main:"#00B8E6",
             text:"#000000"
         },
         accents:{
             main:"#062C6B",
             text:"#FFFFFF"
         },
         navbar:{
             main:"#00B8E6",
             text:"#000000"
         },
         sidebar:{
             main:"#A8C6FA",
             text:"#000000"
         },
         gray:{
             light:"#dadada",
             medium:"#8a8a8a",
             dark:"#363636"
         },
         white:"#FFFFFF",
         black:"#000000",
         success:{
             main:"#beffad",
             text:"#143600"
         },
         error:{
             main:"#FFC7C7",
             text:"#700000"
         }
     },
     typography:{
         fontFamily: [
             '-apple-system',
             'BlinkMacSystemFont',
             '"Segoe UI"',
             'Roboto',
             '"Helvetica Neue"',
             'Arial',
             'sans-serif',
             '"Apple Color Emoji"',
             '"Segoe UI Emoji"',
             '"Segoe UI Symbol"',
         ].join(','),
     }
 })
root.render(
  <React.StrictMode>
      <CssBaseline>
          <ThemeProvider theme={theme}>
              <App />
          </ThemeProvider>
      </CssBaseline>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
