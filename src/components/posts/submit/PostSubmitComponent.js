
import {
    Autocomplete,
    Box,
    Button,
    Card,
    FormLabel,
    Grid,
    Input,
    ListItem,
    Stack,
    TextField,
    Typography,
    Select,
    List, Container, MenuItem, OutlinedInput, FormControl, InputLabel
} from "@mui/material";
import React, {createRef, useState} from "react";
import ErrorHandler from "../../../dependencies/ErrorFormatter";


function PostSubmitComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [selectedProfilesText, setSelectedProfilesText]=useState([]);
    const [profiles, setProfiles]=useState(props.profilesService.getSelfProfiles());
    const [title, setTitle]=useState("");
    const [subreddit, setSubreddit]=useState("");
    const [content, setContent]=useState("");
    const [profilesService, setProfilesService]=useState(props.profilesService);
    const [usersService, setUsersService]=useState(props.usersService);
    const [postsService, setPostsService]= useState(props.postsService);
    const [alt, setAlt]=useState("Alt");
    const file = createRef();
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());




    function guardarContent(e){
        var nombre = e.target.value;
        setContent(nombre);
    }


    function handleResult(){

        if(result == "SUCCESS"){
            console.log("Todo ha ido bien");
            return <p>Todo ha ido bien</p>
        }
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }


    function guardarTitle(e){
        setTitle(e.target.value);
    }

    function  guardarSubreddit(e){
        setSubreddit(e.target.value)
    }

    async function submitPost(){
        var postData = {
            postContent:content,
            subreddit:subreddit,
            title:title,
            alt:alt
        }
        var profiles = getSelectedProfiles();
        var result = await postsService.postMultiple(postData, file.current.children[0].files[0],profiles);
        errorHandler.flushErrors();
        setResult(result.result);
        if(result=="ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
    }

    function printProfiles(){
        var profilesParsed = profiles.map((profile)=>{
            return <MenuItem value={profile.socialMedia+":"+profile.profile}>{profile.profile}
            </MenuItem>

        })
        return <FormControl sx={{backgroundColor:"white",width:"100%"}}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select sx={{backgroundColor:"white"}}
                    labelId="demo-multiple-name-label"
                multiple
                className={"profileSelector"}
                onChange={(e)=>{
                    setSelectedProfilesText(e.target.value);
                }}
                value={selectedProfilesText}
                input={<OutlinedInput />}
                id={"selectProfile"}
            >
                {profilesParsed}
            </Select>
        </FormControl>
    }

    function getSelectedProfiles(){
        var profiles = selectedProfilesText.map((profileString)=>{
            var profileInfo = profileString.split(":");
            var profile = {
                profile:profileInfo[1],
                socialMedia:profileInfo[0]
            };
            return profile;
        });
        return profiles;
    }


    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfiles(list);
    }

    function handleAlt(e){
        setAlt(e.target.value);
    }

    function handleSubmitPostButton(){
        var errorsArray = [];
        var errorsNumber =0;

         if (selectedProfilesText.length==0){
             errorsArray.push(<Typography>Tienes que seleccionar un perfil como mínimo para mandar el post</Typography>) ;
             errorsNumber++;
        }
         if (content==""){
             errorsArray.push(<Typography>El contenido del post no puede estar en blanco</Typography>) ;
             errorsNumber++;
        }
         if(errorsNumber==0)
             return <Button id={"submitPost"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={submitPost}>Añadir</Button>;
        else{
             return errorsArray;
         }


    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} >

        <Typography  align="center"variant={"h5"}component={"h2"}>
            Postear
        </Typography>
        <Stack sx={{paddingTop:"1em"}}spacing={4}>
            <Grid container spacing={4}>
                <Grid item size={6}>
                    <Stack spacing={2}>
                        {errorHandler.handleErrorCodes("content")}
                        <FormLabel  sx={{color:"black"}}>
                            Contenido
                        </FormLabel>
                        <Input id={"submitPostContentField"} type={"content"} onInput={guardarContent}/>
                        {errorHandler.handleErrorCodes("title")}
                        <FormLabel sx={{color:"black"}}>
                            Título
                        </FormLabel>
                        <Input id={"submitPostTitleField"} type={"content"} onInput={guardarTitle}/>
                        {errorHandler.handleErrorCodes("subreddit")}
                        <FormLabel sx={{color:"black"}}>
                            Subreddit
                        </FormLabel>
                        <Input id={"submitPostSubredditField"} type={"content"} onInput={guardarSubreddit}/>
                    </Stack>
                </Grid>
                <Grid item size={6}>
                    <Stack spacing={4}>
                        <FormLabel sx={{color:"black"}}>
                            Imagen Adjunta

                        </FormLabel>
                        <Input type={"file"} name={"image"} ref={file}/>

                        <FormLabel id={""} sx={{color:"black"}}>
                            Texto alternativo

                        </FormLabel>
                        <Input type={"content"} onInput={handleAlt}/>
                    </Stack>
                </Grid>
            </Grid>
            <Card sx={{bgcolor:"primary.main", paddingTop:"1em"}}>

                <Stack>
                    <Typography  align="center"variant={"h6"}component={"h3"}>
                        Seleccionar perfiles
                    </Typography>
                <Button id={"refreshProfilesList"}sx={{backgroundColor:"accents.main", color:"accents.text", margin:"1em"}} onClick={fetchList}>Cargar perfiles</Button>
                </Stack>
               {printProfiles()}
            </Card>


            {errorHandler.handleErrorCodes("profiles")}
            {handleSubmitPostButton()}
        </Stack>
        {handleResult()}

    </Card>);
}

export default PostSubmitComponent;