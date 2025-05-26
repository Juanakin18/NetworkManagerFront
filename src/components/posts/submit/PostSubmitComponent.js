
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
    List
} from "@mui/material";
import React, {createRef, useState} from "react";
import postsService from "../../../users/services/posts/PostsService";

function PostSubmitComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [selectedProfiles, setSelectedProfiles]=useState([]);
    const [profiles, setProfiles]=useState(props.profilesService.getSelfProfiles());
    const [title, setTitle]=useState("");
    const [subreddit, setSubreddit]=useState("");
    const [content, setContent]=useState("");
    const [profilesService, setProfilesService]=useState(props.profilesService);
    const [usersService, setUsersService]=useState(props.usersService);
    const [postsService, setPostsService]= useState(props.postsService);
    const [alt, setAlt]=useState("Alt");
    const file = createRef();



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

    function handleSocialMedias(){
        var result = selectedProfiles.filter((profile)=>{
            return profile.socialMedia=="reddit"
        });

        if(result){
            return [
                handleErrorCodes("title"),

            <FormLabel>
                Título

            </FormLabel>,
                <Input type={"text"} onInput={guardarTitle}/>,

            handleErrorCodes("subreddit"),

            <FormLabel>
                Subreddit

            </FormLabel>,
                    <Input type={"text"} onInput={guardarSubreddit}/>
            ]


        }
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
        await postsService.postMultiple(postData, file.current.files[0],selectedProfiles);
    }

    /*
    async function submitPostImage(){
        var postData = {
            postContent:content,
            subreddit:subreddit,
            title:title,
            media:{
                image:imageRoute,
                imageFile:file,
                alt:alt
            }
        }
        await postsService.postMultiple(postData,selectedProfiles);
    }*/

     function printProfiles(){
        return <List sx={{maxHeight:"20vh", overflow:"auto", bgcolor:"accents.text", margin:"1em", borderRadius:"0.5em", paddingTop:"1em"}}>
            {profiles.map((profile)=>{
                return <ListItem>
                    <Box sx={{bgcolor:"sidebar.main", display:"flex", margin:"1em", width:"100%" , borderRadius:"0.5em", padding:"0.5em"}}>
                        <img className={"socialMediaIcon"} src={"NetworkManagerFront/src/media/icons/bluesky.png"} alt={profile.socialMedia}/>
                        <Typography>{profile.profile}</Typography>
                        <Input type={"checkbox"} onChange={()=>{
                            addProfileToList(profile);
                        }
                        }/>
                    </Box>
                </ListItem>})
            }
        </List>
    }

    function addProfileToList(profile){
        if(selectedProfiles.includes(profile))
            setSelectedProfiles(selectedProfiles.filter((a)=>a!=profile))
        else
            selectedProfiles.push(profile);
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
                        {handleSocialMedias()}
                        {handleErrorCodes("content")}
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