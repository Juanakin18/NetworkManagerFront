
import {
    Button,
    Card,
    FormLabel,
    Grid,
    Input,
    Stack,
    Typography,
    Select,MenuItem, OutlinedInput, FormControl, InputLabel
} from "@mui/material";
import React, {createRef, useState} from "react";
import ErrorHandler from "../../../dependencies/ErrorFormatter";

/**
 * Post submit component
 * @param props The properties
 * @returns The component
 */
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


    /**
     * Saves the content of the post
     * @param e The post content field change event
     */
    function saveContent(e){
        const contentValue = e.target.value;
        setContent(contentValue);
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
     * Saves the title
     * @param e The event of the title field
     */
    function saveTitle(e){
        setTitle(e.target.value);
    }
    /**
     * Saves the subreddit
     * @param e The event of the subreddit field
     */
    function  saveSubreddit(e){
        setSubreddit(e.target.value)
    }

    /**
     * Submits the post
     */
    async function submitPost(){
        const postData = {
            postContent: content,
            subreddit: subreddit,
            title: title,
            alt: alt
        };
        const profiles = getSelectedProfiles();
        const result = await postsService.postMultiple(postData, file.current.children[0].files[0], profiles);
        errorHandler.flushErrors();
        setResult(result.result);
        if(result=="ERROR"){
            errorHandler.setErrors(result.errors);
            setErrors(errorHandler.errors);
        }
    }

    /**
     * Prints the selectable profiles
     * @returns The profiles list
     */
    function printProfiles(){
        const profilesParsed = profiles.map((profile) => {
            return <MenuItem value={profile.socialMedia + ":" + profile.profile}>{profile.profile}
            </MenuItem>

        });
        return <FormControl sx={{backgroundColor:"white",width:"100%"}}>
            <FormLabel sx={{display:"flex", flexDirection:"column"}}>
                <InputLabel id="demo-multiple-name-label">Seleccionar perfiles...</InputLabel>
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
            </FormLabel>

        </FormControl>
    }

    /**
     * Returns the selected profiles
     * @returns The parsed list
     */
    function getSelectedProfiles(){
        const profiles = selectedProfilesText.map((profileString) => {
            const profileInfo = profileString.split(":");
            const profile = {
                profile: profileInfo[1],
                socialMedia: profileInfo[0]
            };
            return profile;
        });
        return profiles;
    }

    /**
     * Gets the profiles list from the server
     */
    async function fetchList(){
        const list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfiles(list);
    }

    /**
     * Handles the alternative text for the image
     * @param e The on change event for the alt text
     */
    function handleAlt(e){
        setAlt(e.target.value);
    }

    /**
     * Handles the post submit button
     * @returns The button
     */
    function handleSubmitPostButton(){
        const errorsArray = [];
        let errorsNumber = 0;

        if (selectedProfilesText.length==0){
             errorsArray.push(<Typography sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", width:"100%", borderRadius:"0.2em"}}>Tienes que seleccionar un perfil como mínimo para mandar el post</Typography>) ;
             errorsNumber++;
        }
         if (content==""){
             errorsArray.push(<Typography sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", width:"100%", borderRadius:"0.2em"}}>El contenido del post no puede estar en blanco</Typography>) ;
             errorsNumber++;
        }
         if(errorsNumber==0)
             return <Button id={"submitPost"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={submitPost}>Postear</Button>;
        else{
             return errorsArray;
         }


    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} >

        <Typography  align="center"  variant={"h5"} component={"h2"}>
            Postear
        </Typography>

        {handleResult()}
        <Stack sx={{paddingTop:"1em"}} spacing={4}>
            <Grid container spacing={4}>
                <Grid item size={6}>
                    <Stack spacing={2}>
                        {errorHandler.handleErrorCodes("content")}
                        <FormLabel  sx={{color:"black",display:"flex", flexDirection:"column"}}>
                            Contenido
                            <Input id={"submitPostContentField"} type={"content"} onInput={saveContent}/>
                        </FormLabel>

                        {errorHandler.handleErrorCodes("title")}
                        <FormLabel sx={{color:"black",display:"flex", flexDirection:"column"}}>
                            Título
                            <Input id={"submitPostTitleField"} type={"content"} onInput={saveTitle}/>
                        </FormLabel>

                        {errorHandler.handleErrorCodes("subreddit")}
                        <FormLabel sx={{color:"black",display:"flex", flexDirection:"column"}}>
                            Subreddit
                            <Input id={"submitPostSubredditField"} type={"content"} onInput={saveSubreddit}/>
                        </FormLabel>

                    </Stack>
                </Grid>
                <Grid item size={6}>
                    <Stack spacing={4}>
                        <FormLabel sx={{color:"black",display:"flex", flexDirection:"column"}}>
                            Imagen Adjunta
                            <Input type={"file"} name={"image"} ref={file}/>
                        </FormLabel>


                        <FormLabel id={""} sx={{color:"black",display:"flex", flexDirection:"column"}}>
                            Texto alternativo
                            <Input type={"content"} onInput={handleAlt}/>
                        </FormLabel>

                    </Stack>
                </Grid>
            </Grid>
            <Card sx={{bgcolor:"primary.main", paddingTop:"1em"}}>

                <Stack>
                    <Typography  align="center" variant={"h6"} component={"h3"}>
                        Seleccionar perfiles
                    </Typography>
                <Button id={"refreshProfilesList"} sx={{backgroundColor:"accents.main", color:"accents.text", margin:"1em"}} onClick={fetchList}>Cargar perfiles</Button>
                </Stack>
               {printProfiles()}
            </Card>


            {errorHandler.handleErrorCodes("profiles")}
            {handleSubmitPostButton()}
        </Stack>


    </Card>);
}

export default PostSubmitComponent;