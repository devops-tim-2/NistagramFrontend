import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import adminService from '../Services/adminService';
import { useHistory } from "react-router-dom";
import toast from "../Shared/Toast";

import {Link} from 'react-router-dom';

export default function AdminLogin() {
  let history = useHistory()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let res = adminService.login(username, password).then(res => {
      if (res)
        history.push('/administration');
      else
        toast.error('Invalid credentials');
    }).catch(err => console.log(err));
  }

  return (
    <div className="Login col-lg-4 col-md-6 col-sm-12 offset-lg-4 offset-md-3 px-5 py-3">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bssize="large" className="my-4">
          <label>Admin username</label>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large" className="my-4">
          <label>Password</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button className="my-2 w-100" block bssize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>

        <br></br>
        <br></br>
      </form>
    </div>
  );
}
