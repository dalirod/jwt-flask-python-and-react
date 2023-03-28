import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    
    if (email.trim() !== "" && password.trim() !== "") {
      const response = await actions.login(email, password);
      if (response) {
        navigate("/");
      } else {
        alert("Error en el usuario o contraseña, por favor intente nuevamente");
      }
    } else {
      console.log("Todos los campos son requeridos");
    }
  };
  useEffect(() => {
    if (store.token && store.token != null) navigate("/");
  }, [store.token]);

  return (
    <div className="ms-5 me-5">
      <h1>Login</h1>

      <div>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
