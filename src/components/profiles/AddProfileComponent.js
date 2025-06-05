import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, FormLabel, TextField, Typography, Input, Stack} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";
function AddProfileComponent(props){

    const [profile,setProfile] = useState("");
    const [password,setPassword] = useState("");
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());
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
        setProfile(nombre);
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
            return <div>
                <h3>Ha habido un error</h3>
                {errorHandler.handleErrorCodes("general")}
            </div>
    }

    async function addRedditSocialMedia(){
        var userID = props.getUserID;
        var query = "user="+props.getLoggedInfo+"&userID="+props.getUserID+"&profile="+profile;
        window.open("http://localhost:3000/reddit/login?"+query, "_blank");
    }

    async function addBlueskySocialMedia(){

        var profileDTO = {
            email:props.usersService.getLoggedUser(),
            socialMedia:"bluesky",
            profile:profile,
            password:password
        }

        var result = await profilesService.addProfile(profileDTO);
        errorHandler.flushErrors();
        setResult(result);
        if(result.errors!=undefined){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
    }





    function handleForm(){
        if(socialMedia == "Bluesky"){
            return [
                errorHandler.handleErrorCodes("password"),
                <FormLabel>
                    Contraseña

                </FormLabel>,
                <Input type={"password"} onInput={guardarPassword} placeholder={"Password"}/>,
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={addBlueskySocialMedia}>Añadir perfil de bluesky</Button>]
        }else if (socialMedia == "Reddit"){
            return<Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={addRedditSocialMedia}>Añadir perfil de reddit</Button>

        }
    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>


        <Stack spacing={2}>
            <Typography  align="center"variant={"h5"}component={"h2"}>
                Añadir red social
            </Typography>
            <FormLabel>
                Red Social
            </FormLabel>
            <Autocomplete
                data-testid="addProfileSocialMedia"
                options={redesSociales}
                onInputChange={(event,newInputValue)=>updateSocialMedia(newInputValue)}
                renderInput={(params)=><TextField{...params}/>} />

            {errorHandler.handleErrorCodes("socialMedia")}
            <FormLabel>
                Email o Nombre de usuario

            </FormLabel>
            <Input type={"text"} onInput={guardarLoginInput} placeholder={"Nombre del perfil"}/>
            {handleForm()}
            {handleResult()}

        </Stack>


    </Card>);
}

export default AddProfileComponent;