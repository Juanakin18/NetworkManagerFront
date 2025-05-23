import React,{useState, useEffect} from "react";
import TwoFactor from "./twofactor";
import {Box, Button, Card, Container, FormLabel, Grid, Input, Typography, Stack} from "@mui/material";
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
        var result = await usersService.login(loginInput,password);
        setResult(result.result);
        if(result.result == "ERROR"){
            setErrors(result.errors);
        }
    }

    function getLoginInput(){
        return loginInput;
    }

    function handleResult(){
        if(result == "SUCCESS"){
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
    }

    function formatErrors(error){
        console.log(error)
        return <li><p>{error}</p></li>;
    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3}>

                <Typography  align="center"variant={"h5"}component={"h2"}>Inicio de sesión</Typography>
            <Stack  spacing={3}>
                {handleErrorCodes("loginInput")}
                <FormLabel>
                    Email o Nombre de usuario
                </FormLabel>
                    <Input type={"text"} onInput={guardarLoginInput}/>
                    {handleErrorCodes("password")}
                    <FormLabel>
                        Contraseña
                    </FormLabel>
                    <Input type={"password"} onInput={guardarPassword}/>

                    {handleResult()}
                    <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={login}>Iniciar sesión</Button>
            </Stack>
    </Card>);
}

export default Login;