import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { login } from "../API/userManager";

function Login({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    login({ email, password })
      .then((user) => {
        history.push("/");
      })
      .catch((err) => {
        setErrors(err.messages || ["Whoops! Something unexpected happened..."]);
      });
  };

  return (
    <form onSubmit={submit}>
      <h1>Login</h1>
      <ul>
        {errors && errors.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log in</button>
      <p>
        Not yet a user? <Link to="/register">Sign up</Link>
      </p>
    </form>
  );
}

export default withRouter(Login);
