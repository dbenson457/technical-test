import React from 'react';
import { Link } from 'react-router-dom';

const TurbineList = ({ turbines }) => (
    <table className="min-w-full table-auto">
        <thead>
            <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Turbine Name</th>
                <th className="px-4 py-2 border">Last Inspected</th>
                <th className="px-4 py-2 border">Components Needing Attention</th>
                <th className="px-4 py-2 border">Actions</th>
            </tr>
        </thead>
        <tbody>
            {turbines.map(turbine => (
                <tr key={turbine.id}>
                    <td className="px-4 py-2 border">{turbine.name}</td>
                    <td className="px-4 py-2 border">{turbine.last_inspected}</td>
                    <td className="px-4 py-2 border">{turbine.components_needing_attention}</td>
                    <td className="px-4 py-2 border">
                        <Link to={`/turbine/${turbine.id}`} className="text-blue-500">View Details</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default TurbineList;
