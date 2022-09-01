import './index.css';
import './assets/sass/theme.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga';

const container = document.getElementById('root');
const TRACKING_ID = "G-M4H6XH3NSB";
ReactGA.initialize(TRACKING_ID);
const root = createRoot(container!);
root.render(<App />);
