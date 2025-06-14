import React,{useState, useEffect} from "react";
import {Button, Card, FormLabel, Input, Stack, Typography} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";
function TwoFactor(props){

    const [number,setNumber] = useState("");
    const [result, setResult] = useState("");
    const [token, setToken] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());
    const  [errors, setErrors] = useState([]);

    const usersService = props.usersService;

    function getLoginInput(){
        return props.getLoginInput();
    }

    function saveNumber(e){
        setNumber(e.target.value);
    }

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
            <FormLabel  sx={{color:"secondary.text"}} >
                Introduzca el número de inicio de sesión

            </FormLabel>
            {errorHandler.handleErrorCodes("tfa")}
            <Input sx={{bgcolor:"white",margin:"1em"}}type={"number"} onInput={saveNumber} placeholder={"Número de verificación"}/>


            <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={checkTFA}>Comprobar doble factor</Button>
        </Stack>
    </Card>);
}

export default TwoFactor;