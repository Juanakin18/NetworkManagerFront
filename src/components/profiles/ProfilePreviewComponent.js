import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, IconButton, Stack, TextField, Typography, Grid} from "@mui/material";
import {Clear, Done} from "@mui/icons-material";
import SocialMediaIconComponent from "../SocialMediaIconComponent";
function ProfilePreviewComponent(props){

    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [selected, setSelected] = useState(props.selected);
    const [index, setIndex] = useState(props.index);


    async function selectProfile(){
        var profile=profilesService.getSelfProfile(index);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        var result =  profilesService.selectProfile(profileLogin, socialMedia);
        setSelected(true);
    }

    function deselectProfile(){
        var profile=profilesService.getSelfProfile(index);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        var result = profilesService.deselectProfile(profileLogin, socialMedia);
        setSelected(false);
    }

    async function zoomProfile(){
        var profile=profilesService.getSelfProfile(index);
        props.zoom(profile.socialMedia, profile.profile, true);
    }

    function handleSelected(){
        var profile=profilesService.getSelfProfile(index);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        if(!selected)
            return <IconButton id={"selectProfile"+socialMedia+profileLogin} onClick={selectProfile}>
                        <Clear></Clear>
                    </IconButton>;
        else
            return <IconButton  id={"deselectProfile"+socialMedia+profileLogin} onClick={deselectProfile}>
                <Done></Done>
            </IconButton>;
    }
    function parse(){
        var profile=profilesService.getSelfProfile(index);
        if(profile!=undefined){
            var socialMedia = profile.socialMedia;
            var profileLogin = profile.profile;
            return <Box id={"previewSelfProfile"+socialMedia+profileLogin}sx={{display:"flex", flexDirection:"row", width:"100%"} }>
                <SocialMediaIconComponent socialMedia={socialMedia}></SocialMediaIconComponent>
                <Grid container>
                    <Grid item size={{md:12, lg:10}}>
                        <Typography sx={{padding:"0.5em"}} onClick={zoomProfile}>{profileLogin}</Typography>
                    </Grid>
                    <Grid item size={{md:12, lg:2}}>
                        {handleSelected()}
                    </Grid>
                </Grid>



            </Box>
        }else{
            return <Box></Box>
        }

    }

    return (
        parse()
    );
}

export default ProfilePreviewComponent;