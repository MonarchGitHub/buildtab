import React, { useState, useEffect, useCallback } from 'react'
import { Handle, Position, useReactFlow, NodeProps } from '@xyflow/react';
import { nanoid } from 'nanoid';

const NewCustomNode = (NodeProps) => {
    console.log("node props", NodeProps.id);
    const [id] = useState(NodeProps.id);


    const [input, setInput] = useState("");
    const { setNodes, deleteElements } = useReactFlow();

    function handleClick() {
        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: nanoid(),
                // type: "text",
                position: { x: Math.random() * 300, y: Math.random() * 300 },
                data: {
                    text: input,
                },
            },
        ]);
        setInput("");
    }

    const deleteNodes = useCallback(() => {
        deleteElements({ nodes: [{ id }] });
    }, [id, deleteElements]);



    return (
        <>
            <Handle type="target" position={Position.Top} />

            <div className=" p-2 bg-purple rounded shadow-md">
                <div className="mb-2 flex justify-between items-center ">
                    {" "}
                    <h2 className="font-semibold">To-do</h2>
                    <p onClick={deleteNodes} >X</p>
                </div>

                <input
                    id="text"
                    name="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter to-do'
                    className='w-full p-1 border rounded'
                />
            </div>



            <Handle type="source" position={Position.Bottom} />
        </>
    )
}

export default NewCustomNode