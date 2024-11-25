import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 


const TurbinePage = () => {
    const [turbine, setTurbine] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

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
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!turbine) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">{turbine.name}</h2>
            <h3 className="text-xl font-medium mb-2">Components</h3>
            <ul>
                {turbine.components.map((component, index) => (
                    <li key={index}>
                        {component.name} - Grade: {component.grade}
                    </li>
                ))}
            </ul>
            <h3 className="text-xl font-medium mt-4">Inspections</h3>
            <ul>
                {turbine.inspections.map((inspection, index) => (
                    <li key={index}>
                        Date: {inspection.date} - Notes: {inspection.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurbinePage;
