
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
import postsService from "../../../services/PostsService";
import ProfilePreviewComponent from "../../profiles/ProfilePreviewComponent";
import SocialMediaIconComponent from "../../SocialMediaIconComponent";
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
        await postsService.postMultiple(postData, file.current.children[0].files[0],getSelectedProfiles());
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
                input={<OutlinedInput label="Perfiles" />}>
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
    }


    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfiles(list);
    }

    function handleAlt(e){
        setAlt(e.target.value);
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
                        <FormLabel>
                            Contenido
                        </FormLabel>
                        <Input type={"content"} onInput={guardarContent}/>
                    </Stack>
                </Grid>
                <Grid item size={6}>
                    <Stack spacing={4}>
                        <FormLabel>
                            Imagen Adjunta

                        </FormLabel>
                        <Input type={"file"} name={"image"} ref={file}/>

                        <FormLabel>
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
                <Button sx={{backgroundColor:"accents.main", color:"accents.text", margin:"1em"}} onClick={fetchList}>Cargar perfiles</Button>
                </Stack>
               {printProfiles()}
            </Card>
            <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={submitPost}>Añadir</Button>

        </Stack>
        {handleResult()}

    </Card>);
}

export default PostSubmitComponent;