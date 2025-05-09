// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Router untuk routing
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}

        {/* Routing Halaman */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        {/* Footer */}
      </div>
    </Router>
  );
}

export default App;
