import React from 'react';
import { Link } from 'react-router-dom';

const TurbineList = ({ turbines }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {turbines.map(turbine => (
            <div key={turbine.id} className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">{turbine.name}</h3>
                <div className="mt-2">
                    <p className="text-gray-600">Last Inspected: <span className="font-bold">{turbine.last_inspected}</span></p>
                    <p className="text-gray-600">Components Needing Attention: 
                        <span className={`font-bold ${parseInt(turbine.components_needing_attention.charAt(0)) >= 3 ? 'text-red-500' : 'text-green-500'}`}>
                            {turbine.components_needing_attention}
                        </span>
                    </p>
                </div>
                <div className="mt-4">
                    <Link to={`/turbine/${turbine.id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
                </div>
            </div>
        ))}
    </div>
);

export default TurbineList;

