import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, IconButton, Stack, TextField, Typography, Grid} from "@mui/material";
import {Clear, Done} from "@mui/icons-material";
import SocialMediaIconComponent from "../SocialMediaIconComponent";
function ProfilePreviewComponent(props){

    const [profileLogin,setProfileLogin] = useState(props.login);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia);
    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [selected, setSelected] = useState(props.selected);

    async function selectProfile(){
        var result =  profilesService.selectProfile(profileLogin, socialMedia);
        setSelected(true);
    }

    function deselectProfile(){
        var result = profilesService.deselectProfile(profileLogin, socialMedia);
        setSelected(false);
    }

    async function zoomProfile(){
        props.zoom(socialMedia, props.login, true);
    }

    function handleSelected(){
        if(!selected)
            return <IconButton onClick={selectProfile}>
                        <Clear></Clear>
                    </IconButton>;
        else
            return <IconButton onClick={deselectProfile}>
                <Done></Done>
            </IconButton>;
    }

    return (
        <Box sx={{display:"flex", flexDirection:"row", width:"100%"} } onClick={zoomProfile}>
            <SocialMediaIconComponent socialMedia={socialMedia}></SocialMediaIconComponent>
            <Grid container>
                <Grid item size={{md:12, lg:10}}>
                    <Typography sx={{padding:"0.5em"}}>{profileLogin}</Typography>
                </Grid>
                <Grid item size={{md:12, lg:2}}>
                    {handleSelected()}
                </Grid>
            </Grid>



        </Box>
    );
}

export default ProfilePreviewComponent;