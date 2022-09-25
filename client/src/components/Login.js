import {React, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

function Login () {
  const stateNull = {
    username: "",
    password: ""
  };

  const [state, setState] = useState(stateNull);

  async function handleClick() {
    const { username, password } = state;

    if (!password || password.length === 0) {
      return alert("Wrong password !");
    }
    try {
      const { data } = await API.login(username, password);
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
//      //Custom API Call
//      window.location = "http://localhost:8800/user/auth/facebook";
//      const token = 1234;
//      localStorage.setItem("token", token);
        const { data } = await API.facebook();
        localStorage.setItem("token", data.token);
        window.location = "/dashboard";
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
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={state.username}
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
        <Button onClick={handleClickInscription} block="true" type="submit">
          Inscription
        </Button>
      </div>
  );
}

export default Login;