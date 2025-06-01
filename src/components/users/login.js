import React,{useState, useEffect} from "react";
import TwoFactor from "./twofactor";
import {Box, Button, Card, Container, FormLabel, Grid, Input, Typography, Stack, List, ListItem} from "@mui/material";
import axios from "axios";
import ErrorHandler from "../../dependencies/ErrorFormatter";
function Login(props){

    const [loginInput,setLoginInput] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());

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
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            errorHandler.setErrors(result.errors);
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
            return <Typography  align="center"variant={"h6"}component={"h3"}>Ha habido un error</Typography>
    }



    async function loginReddit(){
        var userID = props.getUserID;
        window.open("http://localhost:3000/reddit/login?userID="+userID, "_blank");
    }


    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3}>

                <Typography  align="center"variant={"h5"}component={"h2"}>Inicio de sesión</Typography>
            <Stack  spacing={3}>
                {errorHandler.handleErrorCodes("loginInput")}
                <FormLabel>
                    Email o Nombre de usuario
                </FormLabel>
                    <Input type={"text"} onInput={guardarLoginInput} placeholder={"Nombre de usuario"}/>
                    {errorHandler.handleErrorCodes("password")}
                    <FormLabel>
                        Contraseña
                    </FormLabel>
                    <Input type={"password"} onInput={guardarPassword} placeholder={"Password"}/>

                    {handleResult()}
                    <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={login}>Iniciar sesión</Button>
            </Stack>
    </Card>);
}

export default Login;