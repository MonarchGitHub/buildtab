import { useState, useCallback, useEffect } from "react";
import {
    ReactFlow,
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import initialNodes from './NodeTypes';

let initialNodes = [
    {
        id: "1",
        // type: 'input',
        data: { label: "Input Node" },
        position: { x: 250, y: 25 },
    },

    {
        id: "2",
        // you can also pass a React component as a label
        data: {
            label: (
                <div className=" p-2 bg-purple rounded shadow-md">
                    <div className="mb-2 flex justify-between items-center ">
                        {" "}
                        <h2 className="font-semibold">To-do</h2>
                        <p onClick={() => console.log("clicked")}>X</p>{" "}
                    </div>

                    <input
                        type="text"
                        className="w-full p-1 border rounded"
                        placeholder="Enter to-do"
                    />
                </div>
            ),
        },
        position: { x: 100, y: 125 },
    },
    {
        id: "3",
        type: "output",
        data: { label: "Output Node" },
        position: { x: 250, y: 250 },
    },
];

function Flow() {
    // const [nodes, setNodes] = useState(initialNodes);
    const [nodes, setNodes] = useState(initialNodes);
    const [inputValue, setInputValue] = useState("");
    const [submittedValue, setSubmittedValue] = useState("");

    // // Helper function to save elements to Chrome storage
    const saveToStorage = (nodes) => {
        console.log("saved nodes are", nodes);

        if (window.chrome && window.chrome.storage) {
            window.chrome.storage.local.set({ nodes }, () => {
                console.log("nodes saved to storage");
            });
        }
    };

    // Helper function to retrieve elements from Chrome storage
    const getFromStorage = () => {
        if (window.chrome && window.chrome.storage) {
            window.chrome.storage.local.get(["nodes"], (result) => {
                if (result.nodes) {
                    console.log("retrieved nodes from storage", result.nodes);

                    try {
                        return result.nodes;
                    } catch (error) {
                        console.log("error is");

                        console.error(error);
                    }
                }
            });
        }
    };

    // Load saved elements from storage when component mounts
    useEffect(() => {

        const testNodeData = getFromStorage();
        console.log("NATIVE testNodeData is", testNodeData);

    }, []);

    // Save elements to storage whenever they change
    useEffect(() => {
        console.log("saved to storage");

        if (nodes.length > 0) {
            saveToStorage(nodes);
        }
    }, [nodes]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    function updateNodeContent(nodeId, newContent) {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, content: newContent } } // update node content
                    : node
            )
        );
        console.log(`Updated node ${nodeId} with new content: ${newContent}`);
    }

    function addNode(offsetX, offsetY) {
        const newNode = {
            id: `${nodes.length + 1}`,
            type: "default",
            position: { x: offsetX, y: offsetY },
            data: {
                label: addInput(`${nodes.length + 1}`),
                content: inputValue,
            },
        };

        setNodes((nds) => nds.concat(newNode));
        console.log("newNode values are", newNode);
    }

    function getContentById(id) {
        const node = nodes.find((node) => node.id === id);
        return node ? node.data.content : undefined;
    }

    function addInput(id) {
        const content = getContentById(id);
        console.log("inside add input and content is", content);

        return (
            <div className=" p-2 bg-purple rounded shadow-md">
                <div className="mb-2 flex justify-between items-center ">
                    {" "}
                    <h2 className="font-semibold">To-do</h2>
                    <p onClick={() => deleteNode(id)}>X</p>{" "}
                </div>

                <input
                    // value={nodes.data.content ? nodes.data.content : "no content"}
                    type="text"
                    className="w-full p-1 border rounded"
                    placeholder="Enter to-do"
                    onChange={(e) => updateNodeContent(id, e.target.value)}
                />
            </div>
        );
    }

    function deleteNode(id) {
        setNodes((els) => els.filter((el) => el.id !== id));
    }

    function handleDoubleClick(event) {
        console.log(
            "clicked",
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        );
        const { offsetX, offsetY } = event.nativeEvent;

        addNode(offsetX, offsetY);
    }

    return (
        <div className="w-[100vw] h-[100vh]" onDoubleClick={handleDoubleClick}>
            <ReactFlow
                zoomOnScroll={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                onNodesChange={onNodesChange}
                nodes={nodes}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default Flow;
