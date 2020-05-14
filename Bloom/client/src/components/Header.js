import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, removeUser } from "../API/userManager";

function Header({ history }) {
  const user = getUser();

  const logout = () => {
    removeUser();
    history.push("/login");
  };

  return (
    <nav className="header">
      <ul className="nav-items">
        {user ? (
          <>
          <div className="nav-item">
            <Link to="/">Bloom</Link>
          </div>
          <div className="nav--links">

            <li  className="nav-item">
            <Link to="/Coffee">My Coffees</Link>
            </li>
            <li  className="nav-item">
            <Link to="/Equiptment">My Gear</Link>
            </li>
            <li  className="nav-item">
            <Link to="/Explore">Explore</Link>
            </li>
            <li className="nav-item">
              <Link to="/brews">My Brews</Link>
            </li>
          </div>
            <li className="nav-item">
            <Link to={`/profile/${user.id}`}>Hello {user.username}</Link></li>
            <li className="nav-item" 
                onClick={logout}>
                Log out
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default withRouter(Header);
