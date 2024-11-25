import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TurbineList from './TurbineList';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const Dashboard = () => {
    const [windFarms, setWindFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [turbines, setTurbines] = useState([]);
    // Create a ref for the map instance
    const mapRef = useRef(null);
    const defaultIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon
        popupAnchor: [1, -34], // Where the popup should open relative to the marker
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // Shadow image
        shadowSize: [41, 41] // Size of the shadow
    });
    

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

    // Trigger map update when selectedFarm changes
    useEffect(() => {
        if (selectedFarm && selectedFarm.latitude && selectedFarm.longitude && mapRef.current) {
            // Recenter the map to the selected farm's coordinates
            mapRef.current.setView([selectedFarm.latitude, selectedFarm.longitude], 10);
        }
    }, [selectedFarm]);  // This hook runs whenever selectedFarm changes

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Wind Turbine Dashboard</h1>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-1/5 bg-gray-800 text-white p-6">
                    <h2 className="text-lg font-semibold mb-4">Wind Farms</h2>
                    <ul className="space-y-2">
                        {windFarms.map((farm) => (
                            <li
                                key={farm.id}
                                className={`p-2 rounded-md cursor-pointer transition ${
                                    selectedFarm?.id === farm.id
                                        ? 'bg-blue-500'
                                        : 'hover:bg-gray-700'
                                }`}
                                onClick={() => setSelectedFarm(farm)}
                            >
                                {farm.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Display Area */}
                <div className="w-4/5 p-4">
                    {selectedFarm ? (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">{selectedFarm.name}</h2>
                            {/* Map container with dynamic farm location */}
                            <div style={{ marginBottom: '20px' }}>
                                <MapContainer
                                    center={[selectedFarm.latitude, selectedFarm.longitude]}
                                    zoom={10}
                                    style={{ height: '400px', width: '100%' }}
                                    ref={mapRef}  // Assign the mapRef to the map container
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[selectedFarm.latitude, selectedFarm.longitude]} icon={defaultIcon}>
                                        <Popup>{selectedFarm.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <TurbineList turbines={turbines} />
                        </>
                    ) : (
                        <p className="text-gray-500">Select a wind farm to view turbines.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
