import React from 'react';
import { Handle } from 'react-flow-renderer';

const NodeComponent = ({ data }) => {
    return (
        <div className="p-2 bg-white rounded shadow-md border border-gray-300">
            <div className="mb-2 text-lg font-semibold">{data.label}</div>
            <Handle type="source" position="right" style={{ top: 20 }} />
            <Handle type="target" position="left" style={{ top: 20 }} />
        </div>
    );
};

export default NodeComponent;
