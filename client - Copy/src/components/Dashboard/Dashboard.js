import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

function Dashboard() {
  function disconnect() {
    API.logout();
    window.location = "/";
  };

  return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <Button onClick={disconnect} block="true" bsSize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
};

export default Dashboard;