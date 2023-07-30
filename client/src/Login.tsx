import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (Cookies.get("user")) {
    Cookies.remove("user");
  }

  function sendReq(e: any) {
    e.preventDefault();

    const user = {
      username: name,
      password: password,
    };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          navigate("not");
          window.location.reload();
          return;
        } else {
          navigate("logged-in");
        }
      });
  }
  return (
    <div className="container">
      <form className="login" onSubmit={(e) => sendReq(e)}>
        <div className="login__field">
          <i className="login__icon fas fa-user"></i>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="login__input"
            placeholder="User name"
            required
            data-cy="USERNAME"
          />
        </div>
        <div className="login__field">
          <i className="login__icon fas fa-lock"></i>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="login__input"
            placeholder="Password"
            data-cy="PASSWORD"
            required
          />
        </div>
        <button
          type="submit"
          className="button login__submit"
          data-cy="LOGIN_BUTTON"
        >
          <span className="button__text">Log In Now</span>
          <i className="button__icon fas fa-chevron-right"></i>
        </button>
        aa
      </form>
    </div>
  );
};
