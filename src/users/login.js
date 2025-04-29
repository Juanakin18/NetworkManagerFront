import React,{useState, useEffect} from "react";
import TwoFactor from "./twofactor";
import {Box, Card} from "@mui/material";
import axios from "axios";
function Login(props){

    const [loginInput,setLoginInput] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");

    const usersService = props.usersService;

    function guardarLoginInput(e){
        var nombre = e.target.value;
        setLoginInput(nombre)
    }

    function guardarPassword(e){
        setPassword(e.target.value);
    }

    async function login(){
        console.log(loginInput);
        console.log(password);
        var result = await usersService.login(loginInput,password);
        console.log("El resultado del inicio de sesión ha sido:")
        console.log(result)
        setResult(result.result);
        props.setLoggedInfo(loginInput);
        if(result.result == "ERROR"){
            console.log(result.errors);
            setErrors(result.errors);
        }
    }

    function getLoginInput(){
        return loginInput;
    }

    function handleResult(){
        if(result == "SUCCESS"){
            console.log("Todo ha ido bien");
            return <TwoFactor getLoginInput={getLoginInput} usersService={usersService}/>
        }
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }

    function handleErrorCodes(property){
        if(errors ==undefined)
            setErrors([])

        var errorsProperty = errors[property];
        if (errorsProperty == undefined){
            errors[property]=[];
            errorsProperty = errors[property];
        }
        if(errorsProperty==undefined)
            return <p></p>
        else {

            return <ul>
                {errorsProperty.map((error)=>{
                    return formatErrors(error);
                })}
            </ul>;
        }
    }

    async function loginReddit(){
        var userID = props.getUserID;
        window.open("http://localhost:3000/reddit/login?userID="+userID, "_blank");
        /*
        try{




            var result = await axios.get("http://localhost:3000/reddit/login?userID="+props.getUserID());
            //var result = await fetch("http://localhost:3000/signup", requestOptions)
            console.log("Respuesta recibida - Add Profile")

            var resultJSON = await result;
            console.log(resultJSON)
            return resultJSON;
            W

        }catch (e) {
            console.log(e)
            console.error(e.response.errors);
            return e.response.errors;
        }*/
    }

    function formatErrors(error){
        console.log(error)
        return <li><p>{error}</p></li>;
    }

    return (<section className={"loginForm"}>

                <h2>Inicio de sesión</h2>
                {handleErrorCodes("loginInput")}

                <label>
                    Email o Nombre de usuario
                    <input type={"text"} onInput={guardarLoginInput}/>
                </label>

                {handleErrorCodes("password")}

                <label>
                    Contraseña
                    <input type={"password"} onInput={guardarPassword}/>
                </label>


                {handleResult()}

                <button onClick={login}>Iniciar sesión</button>

                <button onClick={loginReddit}>Iniciar sesión en reddit</button>


    </section>);
}

export default Login;