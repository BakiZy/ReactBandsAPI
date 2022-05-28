import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

function Navigation() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Albums </div>
      <nav>
        <ul>
          <li>
            <Link to="/">All albums</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/authentication">Login/Sign Up</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/account">Edit profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
