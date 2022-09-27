import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

function Dashboard() {
  async function disconnect() {
    await API.logout();
    localStorage.clear();
    window.location = "/";
  };

  return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <Button onClick={disconnect} block="true" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
};

export default Dashboard;