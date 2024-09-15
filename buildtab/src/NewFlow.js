import React, { useState, useEffect, useCallback } from "react";
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    MiniMap,
    addEdge,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";

import NewCustomNode from "./components/NewCustomNode";
import { nanoid } from "nanoid";
import nodeHandler from "./nodeHandler";

const initialNodes = [
    {
        id: nanoid(),
        position: { x: 0, y: 0 },
        data: {},
        type: "input",
    },
];

const nodeTypes = {
    input: NewCustomNode,
};

const NewFlow = () => {
    const [input, setInput] = useState("");

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const { setNodes } = useReactFlow();

    function handleClick() {
        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: nanoid(),
                type: "input",
                position: { x: Math.random() * 300, y: Math.random() * 300 },
                data: {
                    text: input,
                },
            },
        ]);

        console.log("nodes", nodes);

        setInput("");
    }




    return (

        <div style={{ width: "100vw", height: "100vh" }} onDoubleClick={handleClick} className="bg-purple-500 ">
            {/* <div className="w-[50px]">Testing</div> */}
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                fitView
                zoomOnScroll={false}
                // proOptions = { hideAttribution: true }
                // panOnDrag={false}
                zoomOnDoubleClick={false}
            >
                <Background color="#fd0e35" variant={BackgroundVariant.Dots} gap={12} size={1} />
                {/* <MiniMap zoomable pannable /> */}
                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
};

export default NewFlow;
