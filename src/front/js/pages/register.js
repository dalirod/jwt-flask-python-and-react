import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link, useNavigate } from "react-router-dom";


export const Register = () => {
	const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    const response = await actions.register(
      email,
      password
    );
    }

	return (

        <div className="ms-5 me-5">
		<h1>Register</h1>
		
		<div>
			 <form onSubmit={register} >
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" value= "Sign up">Submit</button>
      </form>
			
			
		
		</div>
		</div>


    );
    };