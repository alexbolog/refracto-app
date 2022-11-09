import './index.css';
import './assets/sass/theme.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/style.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
