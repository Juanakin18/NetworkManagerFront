import React,{useState} from "react";
import {Button, Card, FormLabel, Input, Stack, Typography} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";

/**
 * Sign up form
 * @param props The properties
 * @returns The form
 */
function Signup(props){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");
    const [result, setResult] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());
    const [errors, setErrors] = useState([]);

    const usersService = props.usersService;
    /**
     * Saves the username
     * @param e The event of the username field
     */
    function saveUsername(e){
        var nombre = e.target.value;
        setUsername(nombre)
    }
    /**
     * Saves the email
     * @param e The event of the email field
     */
    function saveEmail(e){
        setEmail(e.target.value);
    }
    /**
     * Saves the password
     * @param e The event of the password field
     */
    function savePassword(e){
        setPassword(e.target.value);
    }
    /**
     * Saves the repeat password
     * @param e The event of the repeat password field
     */
    function savePasswordRepeat(e){
        setPasswordRepeat(e.target.value);
    }

    /**
     * Adds a user
     */
    async function signup(){
        const result = await usersService.signup(username, email, password, passwordRepeat);
        setResult(result.result);
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
    }
    /**
     * Handles the result
     * @returns The result
     */
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
            <Typography  align="center"  variant={"h5"} component={"h2"}>
                Registro de usuario
            </Typography>
            <Stack sx={{marginTop:"1em"}} spacing={3}>
                {handleResult()}


                <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>Nombre de usuario
                    <Input type={"text"} onInput={saveUsername}/>
                </FormLabel >

                {errorHandler.handleErrorCodes("username")}

                <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                    Email
                    <Input type={"text"} onInput={saveEmail}/>
                </FormLabel>

                {errorHandler.handleErrorCodes("email")}


                <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                    Contraseña
                    <Input type={"password"} onInput={savePassword}/>
                </FormLabel>

                {errorHandler.handleErrorCodes("password")}


                <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                    Reintroducir contraseña
                    <Input type={"password"} onInput={savePasswordRepeat}/>
                </FormLabel>


                {errorHandler.handleErrorCodes("repeatPassword")}
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={signup}>Registrar</Button>
            </Stack>


        </Card>
);
}

export default Signup;