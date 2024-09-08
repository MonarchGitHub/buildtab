import React from 'react';
import { Node } from 'react-flow-renderer';

const CustomNode = ({ id, data }) => (
    <div className="node">
        <Node id={id} data={data} />
    </div>
);

export default CustomNode;
