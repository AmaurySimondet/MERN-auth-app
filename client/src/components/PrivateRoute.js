import React from "react";
import API from "../utils/API.js";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
    return API.isAuth() ? <Outlet/> : <Navigate to="/" />;
};

export default PrivateRoute;