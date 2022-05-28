import React, { useState } from "react";
import { useCallback, useEffect } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
//calculate remaining time for jwt token
function calculateExpirationTime(tokenTimer) {
  //times in milliseconds
  const currentTime = new Date().getTime();
  const adjustedTimer = new Date(tokenTimer).getTime();
  const expirationTime = adjustedTimer - currentTime;
  return expirationTime;
}
//retrieving token from local storage
function retrieveStoredToken() {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expiration");

  const expirationTime = calculateExpirationTime(storedExpirationTime);
  //checking if token is expired or near expiration
  if (expirationTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return null;
  }
  return {
    token: storedToken,
    expiration: expirationTime,
  };
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  //logout function with timer for token
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, tokenTimer) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", tokenTimer);

    const remainingTime = calculateExpirationTime(tokenTimer);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
    // console.log(remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(
        "login remaining time in miliseconds: " + tokenData.expiration
      );
      logoutTimer = setTimeout(logoutHandler, tokenData.expiration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
