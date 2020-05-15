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
          <div className="nav--icon">
            <Link to="/">
              <img src={require ('../icons/circle-logo.svg')} />
            </Link>
          </div>

          <div className="nav--links">

          <li className="nav--filter">
            <img src={require ('../icons/Home.svg')} />
              <NavLink   to="/" activeClassName="active">Dashboard</NavLink>
            </li>
            <li  className="nav--filter">
              <img src={require ('../icons/Explore.svg')} />
              <Link to="/Explore">Explore</Link>
            </li>

            <li className="nav--filter">
              <img src={require ('../icons/Brew.svg')} />
              <NavLink   to="/brews" activeClassName="active">My Brews</NavLink>
            </li>

            <li  className="nav--filter">
              <img src={require ('../icons/Coffee.svg')} />
              <Link to="/Coffee">Coffees</Link>
            </li>

            <li  className="nav--filter">
              <img src={require ('../icons/Grinder.svg')} />
              <Link to="/Equiptment">Equipment</Link>
            </li>
          </div>
          <hr width={198}/>
          <div>

            <li className="nav--filter">
              <img src={require ('../icons/Home.svg')} />
              <Link to={`/profile/${user.id}`}>My Profile</Link>
            </li>

            <li className="nav--filter">
              <img src={require ('../icons/Explore.svg')} />
              <div  onClick={logout}>Log out</div>
            </li>

          </div>
            
            <img src={require ('../icons/bloom.svg')} />
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
