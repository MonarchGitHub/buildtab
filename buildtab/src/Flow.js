import React, { useState, useCallback } from 'react';
// import ReactFlow, { MiniMap, Controls, Background, addEdge } from 'react-flow-renderer';
import { nodeTypes, edgeTypes } from './NodeTypes';
import {
    MiniMap, Controls, Background, ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge
} from '@xyflow/react';
const initialElements = [];

const Flow = () => {


    // const initialNodes = [
    //     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    //     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    // ];

    const [initialNodes, setinitialNodes] = useState([
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    ]);


    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

    const handleDoubleClick = (event) => {
        console.log("clicked");

        const { offsetX, offsetY } = event.nativeEvent;
        const newNode = {
            id: `${initialNodes.length + 1}`,
            type: 'default',
            position: { x: offsetX, y: offsetY },
            data: { label: 'New To-Do' },
        };
        setinitialNodes((els) => [...els, newNode]);
    };
    const onConnect = (params) => console.log('handle onConnect', params);
    // const onConnect = useCallback(
    //     (params) => setEdges((eds) => addEdge(params, eds)),
    //     [setEdges],
    // );
    // const [elements, setElements] = useState(initialElements);

    // const onConnect = (params) => setinitialNodes((els) => addEdge(params, els));

    // const handleDoubleClick = (event) => {
    //     console.log("clicked");

    //     const { offsetX, offsetY } = event.nativeEvent;
    //     const newNode = {
    //         id: `${elements.length + 1}`,
    //         type: 'default',
    //         position: { x: offsetX, y: offsetY },
    //         data: { label: 'New To-Do' },
    //     };
    //     setElements((els) => [...els, newNode]);
    // };

    return (
        // <div className="relative h-screen w-screen" onDoubleClick={handleDoubleClick}>
        //     <ReactFlow
        //         elements={elements}
        //         onConnect={onConnect}
        //         nodeTypes={nodeTypes}
        //         edgeTypes={edgeTypes}
        //         fitView
        //     >
        //         <MiniMap />
        //         <Controls />
        //         <Background />
        //     </ReactFlow>
        // </div>
        <div style={{ width: '100vw', height: '100vh' }} onDoubleClick={handleDoubleClick}>
            <ReactFlow
                zoomOnDoubleClick={false} nodes={initialNodes} edges={initialEdges} >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Flow;
