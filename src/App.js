import React from 'react';
import './App.css';
import data from './data/test.json';
import Line from './components/charts/Line';

function App() {
  return (
    <div className="App" style={{ height: '500px' }}>
      <Line data={data} legendBottom="Bottom" legendLeft="left" />
    </div>
  );
}

export default App;
