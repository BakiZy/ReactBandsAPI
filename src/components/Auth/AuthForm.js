import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import axios from "axios";

let loginAddress = "https://localhost:44310/api/Authentication/login";
let registerAddress = "https://localhost:44310/api/Authentication/register";

function AuthForm() {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const loginFetch = async () => {
      setIsLoading(true);
      const enteredUsername = usernameInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      if (
        enteredUsername.trim().length < 4 ||
        enteredPassword.trim().length < 7
      ) {
        alert("morate uneti validne podatke");
        setIsLoading(false);
        return;
      }

      axios
        .post(loginAddress, {
          username: enteredUsername,
          password: enteredPassword,
        })
        .then(function (response) {
          if (response.status !== 200) {
            alert("greska");
            setIsLoading(false);
            return;
          }
          console.log(response.data);
          authCtx.login(response.data.token, response.data.expiration);
          setIsLoading(false);
          navigate("/");
          setIsLogin(true);
          usernameInputRef.current.value = "";
          passwordInputRef.current.value = "";
        })
        .catch(function (error) {
          console.log(error);
          alert("greska");
          setIsLoading(false);
        });
    };

    //expiration token timer, 2h
    const registerFetch = async () => {
      setIsLoading(true);
      const enteredUsername = usernameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      if (
        enteredUsername.length < 4 ||
        enteredPassword < 7 ||
        !enteredEmail.includes("@")
      ) {
        setIsLoading(false);
        alert("greska pri validaciji podataka");
        return;
      }

      axios
        .post(registerAddress, {
          username: enteredUsername,
          email: enteredEmail,
          password: enteredPassword,
        })
        .then(function (response) {
          console.log(response);
          setIsLoading(false);
          alert("Uspesno ste se registrovali");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
          alert("Greska pri registraciji");
        });
    };

    if (isLogin) {
      loginFetch();
    } else {
      registerFetch();
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="username">Your username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <div>Loading...</div>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
