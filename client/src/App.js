import React, { Component } from 'react';
import CourseList from './components/courses/CourseList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CourseList />
      </div>
    );
  }
}

export default App;
