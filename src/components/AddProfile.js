import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
function AddProfile(props){

    const [profileLogin,setProfileLogin] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [socialMedia, setSocialMedia]=useState({});

    const redesSociales =[
        {label:"Reddit",id:1},
        {label:"Bluesky",id:2},
    ]

    const profilesService = props.profilesService;

    function guardarLoginInput(e){
        var nombre = e.target.value;
        setProfileLogin(nombre);
    }

    function guardarPassword(e){
        setPassword(e.target.value);
    }

    function updateSocialMedia(e){
        var media = e;
        setSocialMedia(media);
    }

    function handleResult(){

        if(result == "SUCCESS"){
            console.log("Todo ha ido bien");
            return <p>Todo ha ido bien</p>
        }
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }

    async function addSocialMedia(){

        var profileDTO = {
            email:props.getLoggedInfo(),
            socialMedia:socialMedia,
            loginInfo:profileLogin,
            password:password
        }

        var result = await profilesService.addProfile(profileDTO);
        setResult(result);
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

        <Box  component="section"
              sx={{ display: 'inline-block', mx: '1em', transform: 'scale(1)' }}>
            <Card>
                <h2>Añadir Red Social</h2>
                <label>
                    Red Social
                    <Autocomplete
                        options={redesSociales}
                        onInputChange={(event,newInputValue)=>updateSocialMedia(newInputValue)}
                        renderInput={(params)=><TextField{...params}/>} />
                </label>
                {handleErrorCodes("socialMedia")}

                <label>
                    Email o Nombre de usuario
                    <input type={"text"} onInput={guardarLoginInput}/>
                </label>

                {handleErrorCodes("password")}

                <label>
                    Contraseña
                    <input type={"password"} onInput={guardarPassword}/>
                </label>


                {handleResult()}

                <button onClick={addSocialMedia}>Añadir</button>
            </Card>
        </Box>

    </div>);
}

export default AddProfile;