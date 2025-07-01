import React,{useState} from "react";
import {Button, Card, FormLabel, Input, Stack, Typography} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";

/**
 * The two factor authentication form
 * @param props The properties
 * @returns The form component
 */
function TwoFactor(props){

    const [number,setNumber] = useState("");
    const [result, setResult] = useState("");
    const [token, setToken] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());
    const  [errors, setErrors] = useState([]);

    const usersService = props.usersService;
    /**
     * Returns the login input
     * @returns The login input
     */
    function getLoginInput(){
        return props.getLoginInput();
    }
    /**
     * Saves the number
     * @param e The event of the number
     */
    function saveNumber(e){
        setNumber(e.target.value);
    }

    /**
     * Checks the number
     */
    async function checkTFA(){
        var result = await usersService.checkTFA(getLoginInput(),number);
        setResult(result.result);
        errorHandler.flushErrors();
        if(result.result == "ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }else{
            setToken(result.token);
        }
    }
    /**
     * Handles the result
     * @returns The result
     */
    function handleResult(){
        if(result == "SUCCESS")
            return <h3>Ha iniciado sesión correctamente con el token {token}</h3>
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }


    return (<Card sx={{ padding:"1em",bgcolor:"primary.main"}}>

        <Typography align="center"variant={"h5"}component={"h2"}>
            Autenticación de doble factor
        </Typography>
        <Stack spacing={3} className={"signup"}>
            {handleResult()}
            <FormLabel  sx={{color:"secondary.text", display:"flex", flexDirection:"column"}}>
                Introduzca el número de inicio de sesión que se le ha enviado por correo
                <Input sx={{bgcolor:"white",margin:"1em"}}type={"number"} onInput={saveNumber} placeholder={"Número de verificación"}/>
            </FormLabel>
            {errorHandler.handleErrorCodes("tfa")}



            <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={checkTFA}>Comprobar doble factor</Button>
        </Stack>
    </Card>);
}

export default TwoFactor;