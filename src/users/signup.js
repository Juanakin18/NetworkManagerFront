import React,{useState, useEffect} from "react";
import {Box, Button, Card, FormLabel, Input, List, ListItem, Stack, Typography} from "@mui/material";
function Signup(props){

    const [nombre,setNombre] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repetirPassword,setRepetirPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");

    const usersService = props.usersService;

    function guardarNombre(e){
        var nombre = e.target.value;
        setNombre(nombre)
    }

    function guardarEmail(e){
        setEmail(e.target.value);
    }

    function guardarPassword(e){
        setPassword(e.target.value);
    }

    function guardarRepetirPassword(e){
        setRepetirPassword(e.target.value);
    }

    async function registrarse(){
        var result = await usersService.signup(nombre,email,password,repetirPassword);
        console.log("El resultado ha sido:")
        console.log(result)
        setResult(result.result);

        if(result.result == "ERROR"){
            console.log(result.errors);
            setErrors(result.errors);
        }
    }

    function handleResult(){
        if(result == "SUCCESS")
            return <h3>Todo ha ido bien</h3>
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
            return <Typography></Typography>
        else {

            return <List>
                {errorsProperty.map((error)=>{
                    return formatErrors(error);
                })}
            </List>;
        }
    }

    function formatErrors(error){
        console.log(error)
        return <ListItem><Typography>{error}</Typography></ListItem>;
    }

    return (
        <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3} className={"mainSection"}>
            <Typography  align="center"variant={"h5"}component={"h2"}>
                Registro de usuario
            </Typography>
            <Stack spacing={3}>
                {handleResult()}
                {handleErrorCodes("name")}

                <FormLabel>Nombre de usuario

                </FormLabel>
                <Input type={"text"} onInput={guardarNombre}/>
                {handleErrorCodes("email")}

                <FormLabel>
                    Email

                </FormLabel>
                <Input type={"text"} onInput={guardarEmail}/>
                {handleErrorCodes("password")}

                <FormLabel>
                    Contraseña

                </FormLabel>
                <Input type={"password"} onInput={guardarPassword}/>
                {handleErrorCodes("repetirPassword")}

                <FormLabel>
                    Reintroducir contraseña

                </FormLabel>
                <Input type={"password"} onInput={guardarRepetirPassword}/>
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={registrarse}>Registrar</Button>
            </Stack>


        </Card>
);
}

export default Signup;