import React from 'react';
import Flow from './Flow';
import BuildspaceQuote from './components/BuildspaceQuote';
import './App.css';
function App() {
  return (
    <div className="w-full h-full bg-gray-100 ">
      <div className='flex items-center justify-center'>
        <BuildspaceQuote />
      </div>
      <Flow />
    </div>
  );
}

export default App;
