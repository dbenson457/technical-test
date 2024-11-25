import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

const TurbinePage = () => {
    // State to store turbine details and error messages
    const [turbine, setTurbine] = useState(null);
    const [error, setError] = useState(null);

    // Extracting the turbine id from URL parameters
    const { id } = useParams();

    // Hook to navigate between pages
    const navigate = useNavigate();

    // Commented code: search params logic to remember the selected wind farm (optional feature, could not get to work)
    /* 
    const [searchParams] = useSearchParams();
    const windFarmId = searchParams.get('windFarmId'); 
    */

    // Fetch turbine details when component mounts or id changes
    useEffect(() => {
        const fetchTurbine = async () => {
            try {
                const response = await axios.get(`/api/turbine/${id}`);
                setTurbine(response.data);
            } catch (err) {
                setError('Error fetching turbine details');
            }
        };
        fetchTurbine();
    }, [id]); // Dependency array: refetch on id change

    // Error state handling
    if (error) {
        return (
            <div className="text-red-500 text-center mt-4">
                {error}
            </div>
        );
    }

    // Loading state while turbine data is being fetched
    if (!turbine) {
        return (
            <div className="text-center mt-4">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Turbine Header Section */}
            <header className="bg-gray-800 text-white p-4 rounded shadow-md mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">{turbine.name}</h1>
                <button
                    className="bg-white text-gray-800 px-4 py-2 rounded shadow font-medium hover:bg-gray-100 transition"
                    onClick={() => navigate(-1)} // Go back to the previous page
                >
                    Back to Dashboard
                </button>
            </header>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Components Section */}
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Components</h2>
                    <div className="space-y-4">
                        {turbine.components.map((component, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded shadow flex justify-between items-center"
                            >
                                <span className="font-medium">{component.name}</span>
                                <span
                                    className={`font-bold ${
                                        component.grade >= 4 ? 'text-red-500' : 'text-green-500'
                                    }`}
                                >
                                    Grade: {component.grade}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inspections Section */}
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Inspections</h2>
                    {turbine.inspections.length > 0 ? (
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turbine.inspections.map((inspection, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">{inspection.date}</td>
                                        <td className="px-4 py-2 border">{inspection.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No inspections available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TurbinePage;
