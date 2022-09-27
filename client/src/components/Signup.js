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
    const { fName, lName, email, password, cpassword } = state;

    if (!email || email.length === 0) return alert("No email given !");
    if (!password || password.length === 0) return alert("No password given !");
    if (!fName || fName.length === 0) return alert("No first name given !");
    if (!lName || lName.length === 0) return alert("No last name given !");
    if (password !== cpassword) return alert("Passwords missmatch !");
    try {
      const { data } = await API.signup({ fName, lName, email, password });
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
        <FormGroup controlId="fName">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={state.fName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId="lName">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={state.lName}
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