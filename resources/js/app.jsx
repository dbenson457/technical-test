import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TurbineDetails from './pages/TurbinePage';

// Import Tailwind CSS
import '../css/app.css';

const App = () => (
    <Router>
        <Routes>
            {/* Route to Dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* Route to Turbine Details */}
            <Route path="/turbine/:id" element={<TurbineDetails />} />
        </Routes>
    </Router>
);

// Render the app using React 18's root API
const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
