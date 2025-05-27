import React, {useState} from "react";
import {Button, Card, Container, FormLabel, Grid, Input, List, ListItem, Stack, Typography} from "@mui/material";
import SocialMediaIconComponent from "../../SocialMediaIconComponent";

function ShareComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [selectedProfiles, setSelectedProfiles]=useState([]);
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

    function handleSocialMedias(){
        var result = selectedProfiles.filter((profile)=>{
            return profile.socialMedia=="reddit"
        });

        if(result.length>0){
            return<Stack>
                {handleErrorCodes("title")}

                <FormLabel>
                    Título

                </FormLabel>
                <Input type={"text"} onInput={saveTitle}/>
                {handleErrorCodes("subreddit")}

                <FormLabel>
                    Subreddit

                </FormLabel>
                <Input type={"text"} onInput={saveSubreddit}/>
            </Stack>

        }
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
        var selected = selectedProfiles;
        await postsService.shareMultiple(postData,selected);
    }


    function printProfiles(){
        return <List sx={{maxHeight:"20vh", overflow:"auto", bgcolor:"accents.text", margin:"1em", borderRadius:"0.5em", padding:"1em"}}>
            {profiles.map((profile)=>{
                return <ListItem>
                    <Container sx={{bgcolor:"sidebar.main", display:"flex", padding:"0.5em", width:"120%", paddingRight:"10em", borderRadius:"0.5em" }}>
                        <SocialMediaIconComponent socialMedia={profile.socialMedia}></SocialMediaIconComponent>
                        <Typography p={0.7}>{profile.profile}</Typography>
                        <Input type={"checkbox"} onChange={()=>{
                            addProfileToList(profile);
                        }
                        }/>
                    </Container>
                </ListItem>})
            }
        </List>
    }



    function addProfileToList(profile){
        if(selectedProfiles.includes(profile))
            setSelectedProfiles(selectedProfiles.filter((a)=>a!=profile))
        else{
            selectedProfiles.push(profile);
            setSelectedProfiles(selectedProfiles)
        }

    }

    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfiles(list);
    }

    return (<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>

        <Typography  variant={"h5"}component={"h3"}>
           Compartir</Typography>
        <Grid container>
            <Grid item size={5} xs={12}>
                <Stack p={1}>
                    {handleErrorCodes("title")}

                    <FormLabel>
                        Título

                    </FormLabel>
                    <Input type={"text"} onInput={saveTitle}/>
                    {handleErrorCodes("subreddit")}

                    <FormLabel>
                        Subreddit

                    </FormLabel>
                    <Input type={"text"} onInput={saveSubreddit}/>
                    <FormLabel>
                    Contenido

                </FormLabel>
                    <Input type={"textarea"} onInput={saveContent}/>
                </Stack>
                {handleErrorCodes("content")}



                {handleResult()}
            </Grid>
            <Grid item size={7}><Card sx={{marginLeft:"1em",padding:"1em"}}>
                <Typography variant={"h6"} component={"h4"}>Seleccione los perfiles a usar</Typography>
                <Button  sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={fetchList}>Cargar perfiles</Button>
                {printProfiles()}
            </Card>

            </Grid>
        </Grid>




        <Button sx={{bgColor:"accents.main", color:"accents.text"}} onClick={sharePost}>Añadir</Button>
    </Card>);
}

export default ShareComponent;