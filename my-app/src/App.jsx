import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./LoginPage";
import SignUp from "./SignUp";
import Intro from "./Intro";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
        </Router>
        
    );
}

export default App;
