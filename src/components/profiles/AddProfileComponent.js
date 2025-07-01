import React,{useState} from "react";

import {Autocomplete, Box, Button, Card, FormLabel, TextField, Typography, Input, Stack} from "@mui/material";
import ErrorHandler from "../../dependencies/ErrorFormatter";

/**
 * Add profile component
 * @param props The properties
 * @returns The component
 */
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
    /**
     * Saves the profile name
     * @param e The event of the name field
     */
    function saveLoginInput(e){
        var loginInput = e.target.value;
        setProfile(loginInput);
    }
    /**
     * Saves the password
     * @param e The event of the password field
     */
    function savePassword(e){
        setPassword(e.target.value);
    }

    /**
     * Saves the social network
     * @param e The event of the social network field
     */
    function updateSocialMedia(e){
        var media = e;
        setSocialMedia(media);
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

    /**
     * Adds a reddit profile
     */
    async function addRedditSocialMedia(){
        var userID = props.getUserID;
        var query = "user="+props.getLoggedInfo+"&userID="+props.getUserID+"&profile="+profile;
        window.open("http://localhost:3000/reddit/login?"+query, "_blank");
    }

    /**
     * Adds a bluesky profile
     */
    async function addBlueskySocialMedia(){

        var profileDTO = {
            email:props.usersService.getLoggedUser(),
            socialMedia:"bluesky",
            profile:profile,
            password:password
        }

        var itExists = await profilesService.doesProfileExist(props.usersService.getLoggedUser(), "bluesky", profile);
        if(itExists){
            setResult("ERRROR")
            errorHandler.setErrors({profileName:["Este perfil ya existe"]})
        }else{
            var result = await profilesService.addProfile(profileDTO);
            errorHandler.flushErrors();
            setResult(result);
            if(result.errors!=undefined){
                errorHandler.setErrors({general:["La contraseña es incorrecta"]});
                setErrors(errorHandler.errors);
            }
        }

    }
    /**
     * Handles the form
     * @returns The form
     */
    function handleForm(){
        if(socialMedia == "Bluesky"){
            return [
                errorHandler.handleErrorCodes("password"),
                <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                    Contraseña
                    <Input type={"password"} onInput={savePassword} placeholder={"Password"}/>,
                </FormLabel>,

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
            {handleResult()}
            <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                Red Social
                <Autocomplete
                data-testid="addProfileSocialMedia"
                options={redesSociales}
                onInputChange={(event,newInputValue)=>updateSocialMedia(newInputValue)}
                renderInput={(params)=><TextField{...params}/>} />
            </FormLabel>


            {errorHandler.handleErrorCodes("socialMedia")}
            <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                Email o Nombre de usuario
                <Input type={"text"} onInput={saveLoginInput} placeholder={"Nombre del perfil"}/>
            </FormLabel>
            {errorHandler.handleErrorCodes("profileName")}

            {handleForm()}

            {errorHandler.handleErrorCodes("general")}

        </Stack>


    </Card>);
}

export default AddProfileComponent;