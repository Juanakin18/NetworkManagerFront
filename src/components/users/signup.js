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
    const [errors, setErrors] = useState([]);

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
        setResult(result.result);
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
    }

    function handleResult(){
        if(result == "SUCCESS")
            return <Card sx={{color:"success.text", backgroundColor:"success.main", padding:"1em" , marginTop:"1em"}}>
                <Typography variant={"h6"}>Todo ha ido bien</Typography>
            </Card>
        else if(result!="")
            return <Card sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", marginTop:"1em"}}>
                <Typography  variant={"h6"} component={"h4"}>Ha habido un error</Typography>
            </Card>
    }


    return (
        <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3} className={"mainSection"}>
            <Typography  align="center"variant={"h5"}component={"h2"}>
                Registro de usuario
            </Typography>
            <Stack sx={{marginTop:"1em"}}spacing={3}>
                {handleResult()}


                <FormLabel  sx={{color:"black"}}>Nombre de usuario

                </FormLabel >
                <Input type={"text"} onInput={saveUsername}/>
                {errorHandler.handleErrorCodes("username")}

                <FormLabel  sx={{color:"black"}}>
                    Email

                </FormLabel>
                <Input type={"text"} onInput={saveEmail}/>
                {errorHandler.handleErrorCodes("email")}


                <FormLabel  sx={{color:"black"}}>
                    Contraseña

                </FormLabel>
                <Input type={"password"} onInput={savePassword}/>
                {errorHandler.handleErrorCodes("password")}


                <FormLabel  sx={{color:"black"}}>
                    Reintroducir contraseña

                </FormLabel>

                <Input type={"password"} onInput={savePasswordRepeat}/>
                {errorHandler.handleErrorCodes("repeatPassword")}
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={signup}>Registrar</Button>
            </Stack>


        </Card>
);
}

export default Signup;