import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CustomerScreen from "./components/CustomerScreen";
import ManagerScreen from "./components/ManagerScreen";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Appointment Booking</h1>
        <nav>
          <Link to="/customer" style={{ margin: "10px" }}>Customer View</Link>
          <Link to="/manager" style={{ margin: "10px" }}>Manager View</Link>
        </nav>
        <Routes>
          <Route path="/customer" element={<CustomerScreen />} />
          <Route path="/manager" element={<ManagerScreen />} />
          <Route path="/" element={<CustomerScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;