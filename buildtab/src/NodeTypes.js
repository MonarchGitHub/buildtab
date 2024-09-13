export default [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: {
            label: <div className=" p-2 bg-purple rounded shadow-md">
                <div className="mb-2 flex justify-between items-center ">  <h2 className="font-semibold">To-do</h2>
                    <p onClick={() => console.log('clicked')}>X</p>  </div>


                <input
                    type="text"
                    className="w-full p-1 border rounded"
                    placeholder="Enter to-do"
                />
            </div>
        },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];
