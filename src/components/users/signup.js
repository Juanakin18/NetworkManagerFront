import React,{useState, useEffect} from "react";
import {Box, Button, Card, FormLabel, Input, List, ListItem, Stack, Typography} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";
function Signup(props){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");
    const [result, setResult] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());

    const usersService = props.usersService;

    function saveUsername(e){
        var nombre = e.target.value;
        setUsername(nombre)
    }

    function saveEmail(e){
        setEmail(e.target.value);
    }

    function savePassword(e){
        setPassword(e.target.value);
    }

    function savePasswordRepeat(e){
        setPasswordRepeat(e.target.value);
    }

    async function signup(){
        var result = await usersService.signup(username,email,password,passwordRepeat);
        console.log("El resultado ha sido:")
        console.log(result)
        setResult(result.result);
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            console.log(result.errors);
            errorHandler.setErrors(result.errors);
        }
    }

    function handleResult(){
        if(result == "SUCCESS")
            return <h3>Todo ha ido bien</h3>
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }


    return (
        <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3} className={"mainSection"}>
            <Typography  align="center"variant={"h5"}component={"h2"}>
                Registro de usuario
            </Typography>
            <Stack spacing={3}>
                {handleResult()}
                {errorHandler.handleErrorCodes("username")}

                <FormLabel>Nombre de usuario

                </FormLabel>
                <Input type={"text"} onInput={saveUsername}/>
                {errorHandler.handleErrorCodes("email")}

                <FormLabel>
                    Email

                </FormLabel>
                <Input type={"text"} onInput={saveEmail}/>
                {errorHandler.handleErrorCodes("password")}

                <FormLabel>
                    Contraseña

                </FormLabel>
                <Input type={"password"} onInput={savePassword}/>
                {errorHandler.handleErrorCodes("repeatPassword")}

                <FormLabel>
                    Reintroducir contraseña

                </FormLabel>
                <Input type={"password"} onInput={savePasswordRepeat}/>
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={signup}>Registrar</Button>
            </Stack>


        </Card>
);
}

export default Signup;