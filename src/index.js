import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MarketDataProvider } from './custom/useMarketData'; // adjust path if different

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <MarketDataProvider>   {/* ✅ wrap App inside provider */}
        <App />
      </MarketDataProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
