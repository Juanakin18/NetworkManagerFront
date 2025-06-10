import React, {useState} from "react";
import {
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

function ShareComponent(props){

    const [errors, setErrors] = useState([]);
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


    function saveContent(e){
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
        await postsService.shareMultiple(postData,selected);
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
        if (selectedProfilesText.length==0){
            errorsArray.push(<Typography>Tienes que seleccionar un perfil como mínimo para mandar el post</Typography>) ;
            errorsNumber++;
        }
        if(errorsNumber==0)
            return <Button id={"shareConfirmButton"} sx={{bgColor:"accents.main", color:"accents.text"}} onClick={sharePost}>Compartir</Button>;
        else
            return errorsArray;
    }
    return (<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>

        <Typography  variant={"h5"}component={"h3"}>
           Compartir</Typography>
        <Grid container>
            <Grid item size={12} >
                <Stack p={1}>
                    {handleErrorCodes("title")}

                    <FormLabel>
                        Título

                    </FormLabel>
                    <Input id={"shareTitleField"} type={"text"} onInput={saveTitle}/>
                    {handleErrorCodes("subreddit")}

                    <FormLabel>
                        Subreddit

                    </FormLabel>
                    <Input id={"shareSubredditField"} type={"text"} onInput={saveSubreddit}/>
                    <FormLabel>
                    Contenido

                </FormLabel>
                    <Input id={"shareContentField"}type={"textarea"} onInput={saveContent}/>
                </Stack>
                {handleErrorCodes("content")}



                {handleResult()}
            </Grid>
            <Grid item size={12}><Card sx={{marginLeft:"1em",padding:"1em"}}>
                <Typography variant={"h6"} component={"h4"}>Seleccione los perfiles a usar</Typography>
                <Button  sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={fetchList}>Cargar perfiles</Button>
                {printProfiles()}
            </Card>

            </Grid>
        </Grid>
        {handleSubmitButton()}

    </Card>);



}

export default ShareComponent;