import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TurbinePage = () => {
    const { id } = useParams();
    const [turbine, setTurbine] = useState(null);

    useEffect(() => {
        axios.get(`/api/turbine/${id}`)
            .then(response => setTurbine(response.data))
            .catch(error => console.error('Error fetching turbine details:', error));
    }, [id]);

    if (!turbine) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">{turbine.name}</h2>
            <h3 className="text-xl mb-2">Components</h3>
            <ul>
                {turbine.components.map((component, index) => (
                    <li key={index} className="mb-2">
                        <strong>{component.name}:</strong> Grade {component.grade} - {component.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurbinePage;
