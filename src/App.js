import React from 'react';
import './App.css';
import VideoComponent from './videoComponent';
import ProfileComponent from './profileComponent'
import ListVideosComponent from './listVideosComponent'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Router>
        <Route path="/profile" component={ProfileComponent} />
        <Route path="/video" component={VideoComponent} />
        <Route path="/" exact component={ListVideosComponent} />
      </Router>
      <div className="Test">
        
      </div>
    </div>
  );
}

export default App;
