import { React, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

function Signup () {
  const stateNull = {
    username: "",
    email: "",
    password: "",
    cpassword: ""
  };

  const [state, setState] = useState(stateNull);

  async function handleClick() {
    const { username, email, password, cpassword } = state;

    if (!email || email.length === 0) return alert("Wrong email !");
    if (!password || password.length === 0) return alert("Wrong password !");
    if (password !== cpassword) return alert("Passwords missmatch !");
    try {
      const { data } = await API.signup({ username, email, password });
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.log(error);
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
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={state.username}
            onChange={handleChange}
          />
        </FormGroup>
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
        <FormGroup controlId="cpassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={state.cpassword}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={handleClick} block="true" type="submit">
          Inscription
        </Button>
      </div>
  );
};

export default Signup;