import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, FormLabel, TextField, Typography, Input, Stack} from "@mui/material";
function AddProfileComponent(props){

    const [profile,setProfile] = useState("");
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
                {handleErrorCodes("general")}
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
        setResult(result);
        if(result.errors!=undefined){
            errors["general"]= result.errors;
            setErrors(errors);
        }
    }


    function handleErrorCodes(property){
        if(errors ==undefined)
            setErrors([])

        var errorsProperty = errors[property];
        if (errorsProperty == undefined){
            errors[property]=[];
            errorsProperty = errors[property];
        }

        var length = errorsProperty.length;
        if(errorsProperty==undefined || length==0)
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

    function handleForm(){
        if(socialMedia == "Bluesky"){
            return [
                handleErrorCodes("password"),
                <FormLabel>
                    Contraseña

                </FormLabel>,
                <Input type={"password"} onInput={guardarPassword}/>,
                <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={addBlueskySocialMedia}>Añadir</Button>]
        }else if (socialMedia == "Reddit"){
            return<Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={addRedditSocialMedia}>Añadir</Button>

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
                options={redesSociales}
                onInputChange={(event,newInputValue)=>updateSocialMedia(newInputValue)}
                renderInput={(params)=><TextField{...params}/>} />

            {handleErrorCodes("socialMedia")}
            <FormLabel>
                Email o Nombre de usuario

            </FormLabel>
            <Input type={"text"} onInput={guardarLoginInput}/>
            {handleForm()}
            {handleResult()}

        </Stack>


    </Card>);
}

export default AddProfileComponent;