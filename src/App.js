import React from 'react';
import './App.css';
import NewsAggregator from './components/NewsAggregator';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='App-Container'>
      <NewsAggregator />
      </div>
    </div>
  );
}

export default App;
