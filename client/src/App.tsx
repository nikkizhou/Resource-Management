import React from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import TaskList from './components/TaskList';
import PositionList from './components/PositionList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/positions" element={<PositionList employeeData={null}   showAllPositions ={true} />} />
          <Route path="/tasks" element={<TaskList positionData={null} showAllTasks={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
