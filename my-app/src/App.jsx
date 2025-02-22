import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./LoginPage";
import MainPage from "./MainPage";
import SignUp from "./SignUp";
import Expense from "./Expense";
import Intro from "./Intro";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/expenses" element={<Expense />} />
                <Route path="/intro" element={<Intro />} />
            </Routes>
        </Router>
        
    );
}

export default App;
