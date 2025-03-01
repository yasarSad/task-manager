import React from 'react';
import ReactDOM from 'react-dom';
import App from './frontend/App';
import {ThemeProvider} from '@mui/material/styles';
import theme from './frontend/theme';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsconfig from './frontend/aws-exports';

Amplify.configure(awsconfig);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
  
);

