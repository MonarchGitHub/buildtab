import React, { useState, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';

// Define your node component
export const NodeComponent = ({ data, id, updateNodeLabel }) => {

    const [inputValue, setInputValue] = useState(data.label || '');

    // Update label in the main component whenever input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        updateNodeLabel(id, e.target.value);


    }


    return (
        <div className="p-2 bg-white rounded shadow-md border border-gray-300">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full p-1 border rounded"
                placeholder="Enter to-do"
            />
            {/* <div className="mb-2 text-lg font-semibold">{data.label}</div> */}
            <Handle type="source" position="right" style={{ top: 20 }} />
            <Handle type="target" position="left" style={{ top: 20 }} />
        </div>
    );
};
// Export node types
export const nodeTypes = {
    default: NodeComponent,
};

// Optionally define edge types if needed
export const edgeTypes = {};
