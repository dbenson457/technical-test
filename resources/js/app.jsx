// resources/js/app.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TurbineDetails from './pages/TurbinePage';

// Import Tailwind CSS (Ensure you've installed Tailwind via npm)
import '../css/app.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Route to Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Route to Turbine Details */}
                <Route path="/turbine/:id" element={<TurbineDetails />} />
            </Routes>
        </Router>
    );
}

// Use React 18's root API to render the app
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
