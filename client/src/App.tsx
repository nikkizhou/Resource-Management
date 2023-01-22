import React from 'react';
import './App.css';
import AnsattList from './components/AnsattList';
import OppgaveList from './components/OppgaveList';
import StillingList from './components/StillingList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<AnsattList />} />
          <Route path="/stillinger" element={<StillingList ansattInfo={ null}  visAlt={true} />} />
          <Route path="/oppgaver" element={<OppgaveList ansattInfo={null} stillingInfo={null} visAlt={true} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
