import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<div  className="">

    <h1 className="d-flex justify-content-center ">Inicio de sesion(private)</h1>

	
	<Link to="register">
	<button onClick={()=> actions.logout} className="btn btn-primary d-flex justify-content-center logout">Logout</button>
	</Link>

	</div>
    </>
	);
};
