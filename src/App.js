import React, { Component } from 'react';
import Map from './components/map/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h2>OSMP Management Areas</h2>
          <Map />
        </header>
      </div>
    );
  }
}

export default App;
