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
          <div >
            <Link to="/">
              <img src={require ('../icons/circle-logo.svg')} />
            </Link>
          </div>

          <div className="nav--links">

          <li className="nav--filter">
            <img className="nav--icon"src={require ('../icons/Home.svg')} />
              <NavLink activeClassName="active"  exact to="/" >Dashboard</NavLink>
            </li>

            <li  className="nav--filter">
              <img className="nav--icon" src={require ('../icons/Explore.svg')} />
              <NavLink activeClassName="active" to="/Explore">Explore</NavLink>
            </li>

            <li className="nav--filter" >
              <img  className="nav--icon" src={require ('../icons/Brew.svg')} />
              <NavLink activeClassName="active" to="/brews" >My Brews</NavLink>
            </li>

            <li  className="nav--filter">
              <img className="nav--icon" src={require ('../icons/Coffee.svg')} />
              <NavLink activeClassName="active" to="/Coffee">Coffees</NavLink>
            </li>

            <li  className="nav--filter">
              <img className="nav--icon" src={require ('../icons/Grinder.svg')} />
              <NavLink activeClassName="active" to="/Equiptment">Equipment</NavLink >
            </li>
          </div>
          <hr className="hr" width={198}/>
          <div>

            <li className="nav--filter">
              <img className="nav--icon" src={require ('../icons/Home.svg')} />
              <NavLink activeClassName="active" to={`/profile/${user.id}`}>My Profile</NavLink>
            </li>

            <li className="nav--filter">
              <img className="nav--icon" src={require ('../icons/Explore.svg')} />
              <div  onClick={logout}>Log out</div>
            </li>

          </div>
            
            <img className="nav--icon" src={require ('../icons/bloom.svg')} />
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
