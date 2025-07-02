import React,{useState, useEffect} from "react";
import TwoFactor from "./twofactor";
import {Box, Button, Card, Container, FormLabel, Grid, Input, Typography, Stack, List, ListItem} from "@mui/material";
import axios from "axios";
import ErrorHandler from "../../dependencies/ErrorFormatter";

/**
 * Login component
 * @param props Properties
 * @returns The login component
 */
function Login(props){

    const [loginInput,setLoginInput] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());

    const usersService = props.usersService;
    /**
     * Saves the login input
     * @param e The event of the login input field
     */
    function saveLoginInput(e){
        var nombre = e.target.value;
        setLoginInput(nombre)
    }
    /**
     * Saves the password
     * @param e The event of the password field
     */
    function savePassword(e){
        setPassword(e.target.value);
    }

    /**
     * Logs the user in
     */
    async function login(){
        var result = await usersService.login(loginInput,password);
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
        setResult(result.result);
    }

    /**
     * Returns the login input
     * @returns The login input
     */
    function getLoginInput(){
        return loginInput;
    }

    /**
     * Displays the signup tab
     */
    function toggleToSignup(){
        props.toggle("signup");
    }

    /**
     * Handles the result
     * @returns The result
     */
    function handleResult(){
        if(result == "SUCCESS"){
            return <TwoFactor getLoginInput={getLoginInput} usersService={usersService}/>
        }
        else if(result!="")
            return <Card sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", marginTop:"1em"}}>
                <Typography  variant={"h6"} component={"h4"}>Ha habido un error</Typography>
            </Card>
    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3}>


                <Typography align="center"variant={"h5"}component={"h2"}>Inicio de sesión</Typography>
            <Stack  sx={{marginTop:"1em"}}  spacing={3}>

                <FormLabel  labelFor={"loginUserName"} sx={{color:"black", display:"flex", flexDirection:"column"}}>
                    Email o Nombre de usuario
                    <Input id={"loginUserName"}type={"text"} onInput={saveLoginInput} placeholder={"Nombre de usuario"}/>
                </FormLabel>


                {errorHandler.handleErrorCodes("username")}
                    <FormLabel labelFor={"loginPassword"} sx={{color:"black", display:"flex", flexDirection:"column"}}>
                        Contraseña
                        <Input id={"loginPassword"}type={"password"} onInput={savePassword} placeholder={"Password"}/>
                    </FormLabel>

                {errorHandler.handleErrorCodes("password")}

                    <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={login}>Iniciar sesión</Button>
                {handleResult()}
                <Stack align={"center"}>
                    <Typography>¿No tienes cuenta?</Typography>
                    <Button sx={{backgroundColor:"navbar.main",color:"navbar.text"}} onClick={toggleToSignup}>Regístrate</Button>
                </Stack>

            </Stack>
    </Card>);
}

export default Login;