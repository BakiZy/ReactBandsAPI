import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const currentPasswordInput = useRef();
  const newPasswordInput = useRef();
  const confirmPasswordInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const currentPassword = currentPasswordInput.current.value;
    const newPassword = newPasswordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;

    if (newPassword !== confirmPassword) {
      alert("Lozinke se ne podudaraju!");
      return;
    }

    const data = {
      username,
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const changePassword = async () => {
      axios
        .post(
          "https://localhost:44310/api/Authentication/change-password",
          data
        )
        .then(function (response) {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    changePassword();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="current-password">Current password</label>
        <input
          type="password"
          id="current-password"
          required
          minLength="7"
          ref={currentPasswordInput}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          minLength="7"
          ref={newPasswordInput}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          required
          ref={confirmPasswordInput}
        />
      </div>
      <div>
        <button>Change password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
