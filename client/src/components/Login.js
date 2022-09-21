import {React, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

function Login () {
  const stateNull = {
    email: "",
    password: ""
  };

  const [state, setState] = useState(stateNull);

  async function handleClick() {
    const { email, password } = state;

    if (!email || email.length === 0) {
      return alert("Wrong email !");
    }
    if (!password || password.length === 0) {
      return alert("Wrong password !");
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      alert(error);
    }
  };

  function handleChange(event){
    setState(oldState => {
        return ({
            ...oldState,
            [event.target.id]: event.target.value
        });
    });
  };

  return (
      <div className="Login">
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
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
      </div>
  );
}

export default Login;