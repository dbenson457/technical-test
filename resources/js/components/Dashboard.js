import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TurbineList from './TurbineList';

const Dashboard = () => {
    const [windFarms, setWindFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [turbines, setTurbines] = useState([]);

    useEffect(() => {
        axios.get('/api/windfarms')
            .then(response => setWindFarms(response.data))
            .catch(error => console.error('Error fetching wind farms:', error));
    }, []);

    useEffect(() => {
        if (selectedFarm) {
            axios.get(`/api/windfarm/${selectedFarm.id}/turbines`)
                .then(response => setTurbines(response.data))
                .catch(error => console.error('Error fetching turbines:', error));
        }
    }, [selectedFarm]);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-semibold mb-4">Wind Farms</h2>
                <ul>
                    {windFarms.map(farm => (
                        <li
                            key={farm.id}
                            className={`p-2 cursor-pointer ${selectedFarm?.id === farm.id ? 'bg-gray-600' : ''}`}
                            onClick={() => setSelectedFarm(farm)}
                        >
                            {farm.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                {selectedFarm ? (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">{selectedFarm.name}</h2>
                        <TurbineList turbines={turbines} />
                    </>
                ) : (
                    <p className="text-gray-500">Select a wind farm to view turbines.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
