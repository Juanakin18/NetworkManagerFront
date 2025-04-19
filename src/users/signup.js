import React,{useState, useEffect} from "react";
import {Box, Card} from "@mui/material";
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

    return (<div>


        <Box>
            <h2>Registro de usuario</h2>
            <Card>
                {handleResult()}
                {handleErrorCodes("name")}

                <label>Nombre de usuario
                    <input type={"text"} onInput={guardarNombre}/>
                </label>
                {handleErrorCodes("email")}

                <label>
                    Email
                    <input type={"text"} onInput={guardarEmail}/>
                </label>

                {handleErrorCodes("password")}

                <label>
                    Contraseña
                    <input type={"password"} onInput={guardarPassword}/>
                </label>
                {handleErrorCodes("repetirPassword")}

                <label>
                    Reintroducir contraseña
                    <input type={"password"} onInput={guardarRepetirPassword}/>
                </label>

                <button onClick={registrarse}>Registrar</button>
            </Card>
        </Box>
    </div>);
}

export default Signup;