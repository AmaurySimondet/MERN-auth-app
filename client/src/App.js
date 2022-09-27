import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import PrivateRoute from "./components/PrivateRoute.js";

function App() {

    return (
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />

            <Route path="/dashboard/*" element={<PrivateRoute/>}>
                <Route exact path='/dashboard/*' element={<Dashboard/>}/>
            </Route>

          </Routes>
    );
};

export default App;