import {React, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";
import axios from 'axios'


function Login () {
  const stateNull = {
    email: "",
    password: ""
  };

  const [state, setState] = useState(stateNull);

  async function handleClick() {
    const { email, password } = state;

    if (!email || email.length === 0) {
      return alert("No email given !");
    }
    if (!password || password.length === 0) {
      return alert("No password given !");
    }
    try {
      const { data } = await API.login(email, password);
      if (data.success === true){
        localStorage.setItem("token", data.token);
        window.location = "/dashboard";
      }else{
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  async function handleClickFacebook(){
    try {
      //Custom API Call
      window.location = "http://localhost:8800/user/auth/facebook";
    } catch (error) {
      alert(error);
    }
  }

  async function handleClickGoogle(){
    try {
      //Custom API Call
      window.location = "http://localhost:8800/user/auth/google";
    } catch (error) {
      alert(error);
    }
  }

  function handleChange(event){
    setState(oldState => {
        return ({
            ...oldState,
            [event.target.id]: event.target.value
        });
    });
  };

  function handleClickInscription() {
    window.location = "/signup"
  }

  return (
      <div className="Login">
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={state.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={state.password}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={handleClick} block="true" type="submit">
          Connexion
        </Button>
        <Button onClick={handleClickFacebook} block="true" type="submit">
          Connexion avec facebook
        </Button>
        <Button onClick={handleClickGoogle} block="true" type="submit">
          Connexion avec google
        </Button>
        <Button onClick={handleClickInscription} block="true" type="submit">
          Inscription
        </Button>
      </div>
  );
}

export default Login;