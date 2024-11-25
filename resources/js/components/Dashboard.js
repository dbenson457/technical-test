import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TurbineList from './TurbineList';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Dashboard = () => {
    // State to store the list of wind farms, selected farm, and associated turbines
    const [windFarms, setWindFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [turbines, setTurbines] = useState([]);

    // Fetch the list of wind farms when the component mounts
    useEffect(() => {
        axios.get('/api/windfarms')
            .then((response) => {
                setWindFarms(response.data);
            })
            .catch((error) => {
                console.error('Error fetching wind farms:', error);
            });
    }, []);

    // Fetch turbines for the selected wind farm when it changes
    useEffect(() => {
        if (selectedFarm) {
            axios.get(`/api/windfarm/${selectedFarm.id}/turbines`)
                .then((response) => {
                    setTurbines(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching turbines:', error);
                });
        }
    }, [selectedFarm]);

    // Update map view to center on the selected wind farm
    useEffect(() => {
        if (selectedFarm && selectedFarm.latitude && selectedFarm.longitude && mapRef.current) {
            mapRef.current.setView([selectedFarm.latitude, selectedFarm.longitude], 10);
        }
    }, [selectedFarm]); // This effect runs when `selectedFarm` changes

    // Ref to store map instance to allow dynamic updates
    const mapRef = useRef(null);
    // Default icon for map markers
    const defaultIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41], 
    });

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header Section */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold text-center">Wind Turbine Dashboard</h1>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1">
                {/* Sidebar with list of wind farms */}
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

                {/* Main Display Area for Selected Wind Farm and Map */}
                <div className="w-4/5 p-4">
                    {selectedFarm ? (
                        <>
                            {/* Display the selected wind farm's name */}
                            <h2 className="text-2xl font-semibold mb-4">{selectedFarm.name}</h2>

                            {/* Map Container for displaying the selected wind farm's location */}
                            <div style={{ marginBottom: '20px' }}>
                                <MapContainer
                                    center={[selectedFarm.latitude, selectedFarm.longitude]}
                                    zoom={10}
                                    style={{ height: '400px', width: '100%' }}
                                    ref={mapRef}  // Assign the mapRef to allow manipulation of the map instance
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[selectedFarm.latitude, selectedFarm.longitude]}
                                        icon={defaultIcon}
                                    >
                                        <Popup>{selectedFarm.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>

                            {/* Display the list of turbines in the selected wind farm */}
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
