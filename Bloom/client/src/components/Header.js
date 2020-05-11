import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { getUser, removeUser } from "../API/userManager";
import { FaUnderline } from "react-icons/fa";

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
          <li  className="nav-item">
          <NavLink to='/Coffee' exact activeStyle={{textDecorationLine: 'underline', color: '#fff'}}>
              My Coffees
            </NavLink>
           {/* <Link to="/Coffee" >My Coffees</Link> */}
          </li>
          <li  className="nav-item">
           <Link to="/Equiptment">My Gear</Link>
          </li>
          <h1 className="nav-item">
            <NavLink to='/' exact activeStyle={{color: '#fff'}}>
              Bloom
            </NavLink>
            {/* <Link to="/">Bloom</Link> */}
          </h1>
          <li className="nav-item">
            <Link to="/brews">My Brews</Link>
          </li>
            <li className="nav-item">Hello {user.username}</li>
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
