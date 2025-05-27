import React,{useState, useEffect} from "react";
import {Button, Card, FormLabel, Input, Stack, Typography} from "@mui/material";
function TwoFactor(props){

    const [numero,setNumero] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [token, setToken] = useState("");

    const usersService = props.usersService;

    function getLoginInput(){
        return props.getLoginInput();
    }

    function guardarNumero(e){
        setNumero(e.target.value);
    }

    async function checkTFA(){
        var result = await usersService.checkTFA(getLoginInput(),numero);
        setResult(result.result);
        if(result.result == "ERROR"){
            setErrors(result.errors);
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

    function formatErrors(error){
        console.log(error)
        return <li><p>{error}</p></li>;
    }

    return (<Card sx={{bgcolor:"primary.main"}}>

        <Typography align="center"variant={"h5"}component={"h2"}>
            Autenticación de doble factor
        </Typography>
        <Stack spacing={3} className={"signup"}>


            {handleResult()}


            {handleErrorCodes("number")}

            <FormLabel  sx={{color:"secondary.text"}} >
                Introduzca el número de inicio de sesión

            </FormLabel>
            <Input type={"number"} onInput={guardarNumero}/>


            <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={checkTFA}>Comprobar doble factor</Button>
        </Stack>
    </Card>);
}

export default TwoFactor;