import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
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
          <div className="nav--filter">
            <Link to="/">Bloom</Link>
          </div>
          <div className="nav--links">

            <li  className="nav--filter">
            <Link to="/Coffee">My Coffees</Link>
            </li>
            <li  className="nav--filter">
            <Link to="/Equiptment">My Gear</Link>
            </li>
            <li  className="nav--filter">
            <Link to="/Explore">Explore</Link>
            </li>
            <li className="nav--filter">
              <NavLink   to="/brews" activeClassName="active">
              My Brews
              </NavLink>
              {/* <Link  to="/brews">My Brews</Link> */}
            </li>
          </div>
            <li className="nav--filter">
            <Link to={`/profile/${user.id}`}>My Profile</Link></li>
            <li className="nav--filter" 
                onClick={logout}>
                Log out
            </li>
          </>
        ) : (
          <>
            <li className="nav--filter">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav--filter">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default withRouter(Header);
