import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    Container, FormControl,
    FormLabel,
    Grid,
    Input, InputLabel,
    List,
    ListItem, MenuItem, OutlinedInput,
    Select,
    Stack,
    Typography
} from "@mui/material";
import SocialMediaIconComponent from "../../SocialMediaIconComponent";
import errorFormatter from "../../../dependencies/ErrorFormatter";
import ErrorHandler from "../../../dependencies/ErrorFormatter";

function ShareComponent(props){
    const [result, setResult] = useState("");
    const [selectedProfilesText, setSelectedProfilesText]=useState([]);
    const [profiles, setProfiles]=useState(props.profilesService.getSelfProfiles());
    const [title, setTitle]=useState("");
    const [subreddit, setSubreddit]=useState("");
    const [content, setContent]=useState("");
    const [profilesService, setProfilesService]=useState(props.profilesService);
    const [postsService, setPostsService]= useState(props.postsService);
    const [getPost, setGetPost]=useState(props.getPost);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia)
    const [errors, setErrors]=useState({})
    const [errorHandler, setErrorHandler] = useState(new ErrorHandler());


    function saveContent(e){
        var nombre = e.target.value;
        setContent(nombre);
    }


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

    function saveTitle(e){
        setTitle(e.target.value);
    }

    function  saveSubreddit(e){
        setSubreddit(e.target.value)
    }

    async function sharePost(){
        var post = getPost;
        var postData = {
            postToShare:post,
            postContent:content,
            subreddit:subreddit,
            title:title,
            socialMedia:socialMedia
        }
        var selected = getSelectedProfiles();
        var result = await postsService.shareMultiple(postData,selected);
        var status = result.status;
        if(status==undefined)
            status=result.result;
        setResult(status);
        errorHandler.flushErrors();
        var errors = result.errors;
        if(errors!=undefined) {
            errorHandler.setErrors(errors);
            setErrors(errors);
        }

    }


    function printProfiles(){
        var profilesParsed = profiles.map((profile)=>{
            return <MenuItem value={profile.socialMedia+":"+profile.profile}>{profile.profile}
            </MenuItem>

        })
        return <FormControl sx={{backgroundColor:"white",width:"100%"}}>
            <InputLabel id="demo-multiple-name-label">Seleccionar perfiles</InputLabel>
            <Select sx={{backgroundColor:"white"}}
                    labelId="demo-multiple-name-label"
                    multiple
                    className={"profileSelector"}
                    onChange={(e)=>{
                        setSelectedProfilesText(e.target.value);
                    }}
                    value={selectedProfilesText}
                    input={<OutlinedInput label="Perfiles" />}
                    id={"selectProfile"}>
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
    function handleSubmitButton(){

        var errorsArray = [];
        var errorsNumber =0;
        var isValidReddit = checkReddit();
        if(isValidReddit){
            if(subreddit==""){
                errorsArray.push(<Typography>Si quieres subirlo a reddit, tienes que introducir un subreddit</Typography>)
                errorsNumber++;
            }
            if(title==""){
                errorsArray.push(<Typography>Si quieres subirlo a reddit, tienes que introducir un título</Typography>)
                errorsNumber++;
            }

        }
        if (selectedProfilesText.length==0){
            errorsArray.push(<Typography>Tienes que seleccionar un perfil como mínimo para mandar el post</Typography>) ;
            errorsNumber++;
        }
        if(errorsNumber==0)
            return <Button id={"shareConfirmButton"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={sharePost}>Compartir</Button>;
        else
            return <Stack sx={{color:"error.text", backgroundColor:"error.background"}}>{errorsArray}</Stack> ;
    }

    function checkReddit() {
        var selected = getSelectedProfiles();
        var redditProfiles = selected.filter((profile)=>profile.socialMedia=="reddit");
        return redditProfiles.length!=0;
    }
    return (<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>

        {handleResult()}
        <Typography  variant={"h5"}component={"h3"}>
           Compartir</Typography>
        <Grid container>
            <Grid item size={12} >
                <Stack p={1}>
                    {errorHandler.handleErrorCodes("title")}

                    <FormLabel  sx={{color:"black"}}>
                        Título

                    </FormLabel >
                    <Input id={"shareTitleField"} type={"text"} onInput={saveTitle}/>
                    {errorHandler.handleErrorCodes("subreddit")}

                    <FormLabel  sx={{color:"black"}}>
                        Subreddit

                    </FormLabel>
                    <Input id={"shareSubredditField"} type={"text"} onInput={saveSubreddit}/>
                    <FormLabel  sx={{color:"black"}}>
                    Contenido

                </FormLabel>
                    <Input id={"shareContentField"}type={"textarea"} onInput={saveContent}/>
                </Stack>
                {errorHandler.handleErrorCodes("content")}




            </Grid>
            <Grid item size={12}><Card sx={{marginLeft:"1em",padding:"1em"}}>
                <Typography variant={"h6"} component={"h4"}>Seleccione los perfiles a usar</Typography>
                {printProfiles()}
                <Button  sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={fetchList}>Recargar perfiles</Button>

            </Card>

            </Grid>
        </Grid>
        {handleSubmitButton()}

    </Card>);



}

export default ShareComponent;