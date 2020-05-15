import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { register } from "../API/userManager";

function Register({ history }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    register({
      username,
      email,
      firstName, 
      lastName,
      password,
      confirmPassword,
    })
      .then((user) => history.push("/"))
      .catch((err) => {
        setErrors(err.messages || ["Whoops! Something unexpected happened..."]);
      });
  };

  return (
    <div className="coffee--view">

    <form className="login--container" onSubmit={submit}>
      <h1>Register</h1>
      <ul>
        {errors && errors.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="firstName"
          required
          placeholder="First Name..."
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="lastName"
          required
          placeholder="Last Name..."
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn"type="submit btn">Register</button>
      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </form>
    </div>
  );
}

export default withRouter(Register);
