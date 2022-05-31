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
            <Link to="/">Svi albumi</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/authentication">Login/Odjava</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/account">Izmeni profil</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/new-album">Novi album</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/" onClick={logoutHandler}>
                Odjavi se
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
