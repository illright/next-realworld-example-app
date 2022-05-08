import Router from "next/router";
import React from "react";
import { mutate } from "swr";

import ListErrors from "../common/ListErrors";
import UserAPI from "../../lib/api/user";

const RegisterForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = React.useCallback(
    (e) => setUsername(e.target.value),
    []
  );
  const handleEmailChange = React.useCallback(
    (e) => setEmail(e.target.value),
    []
  );
  const handlePasswordChange = React.useCallback(
    (e) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await UserAPI.register(
        username,
        email,
        password
      );
      if (status !== 200 && data?.errors) {
        setErrors(data.errors);
      }
      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        mutate("user", data.user);
        Router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <label htmlFor="register-form-username" className="form-control-label">
              Username
            </label>
            <input
              className="form-control form-control-lg"
              type="text"
              id="register-form-username"
              placeholder="person"
              value={username}
              onChange={handleUsernameChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="register-form-email" className="form-control-label">
              Email
            </label>
            <input
              className="form-control form-control-lg"
              type="email"
              id="register-form-email"
              placeholder="sample@email.com"
              value={email}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="register-form-password" className="form-control-label">
              Password
            </label>
            <input
              className="form-control form-control-lg"
              type="password"
              id="register-form-password"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign up
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default RegisterForm;
