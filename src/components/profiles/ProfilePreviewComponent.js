import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, IconButton, Stack, TextField, Typography, Grid} from "@mui/material";
import {ArrowForward, CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import SocialMediaIconComponent from "../SocialMediaIconComponent";
function ProfilePreviewComponent(props){

    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [selected, setSelected] = useState(props.selected);
    const [index, setIndex] = useState(props.index);
    const [socialMedia, setSocialMedia] = useState(props.socialMedia);


    async function selectProfile(){
        var profile=profilesService.getSelfProfile(index, props.socialMedia);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        var result =  profilesService.selectProfile(profileLogin, socialMedia);
        setSelected(true);
    }

    function deselectProfile(){
        var profile=profilesService.getSelfProfile(index, props.socialMedia);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        var result = profilesService.deselectProfile(profileLogin, socialMedia);
        setSelected(false);
    }

    async function zoomProfile(){
        var profile=profilesService.getSelfProfile(index, props.socialMedia);
        await selectProfile();
        props.zoom(profile.socialMedia, profile.profile, true);
    }

    function handleSelected(){
        var profile=profilesService.getSelfProfile(index, props.socialMedia);
        var socialMedia = profile.socialMedia;
        var profileLogin = profile.profile;
        var isSelected = profilesService.isSelected(socialMedia,profileLogin);
        if(!isSelected)
            return <IconButton title={"selectProfileButton"}id={"selectProfile"+socialMedia+profileLogin} onClick={selectProfile}>
                        <CheckBoxOutlineBlank></CheckBoxOutlineBlank>
                    </IconButton>;
        else
            return <IconButton title={"deselectProfileButton"} id={"deselectProfile"+socialMedia+profileLogin} onClick={deselectProfile}>
                <CheckBox></CheckBox>
            </IconButton>;
    }
    function parse(){
        var profile=profilesService.getSelfProfile(index, props.socialMedia);
        if(profile!=undefined){
            var socialMedia = profile.socialMedia;
            var profileLogin = profile.profile;
            return <Grid container id={"previewSelfProfile"+socialMedia+profileLogin}sx={{display:"flex", flexDirection:"row", width:"100%", marginTop:"1em", backgroundColor:"white", borderRadius:"0.2em"} }>
                <Grid item size={1}>
                    <SocialMediaIconComponent socialMedia={socialMedia}></SocialMediaIconComponent>
                </Grid>
                <Grid item size={11}>
                    <Grid container>
                        <Grid item size={{md:12, lg:8}}>
                            <Typography sx={{padding:"0.5em"}} onClick={zoomProfile}>{profileLogin}</Typography>
                        </Grid>
                        <Grid item size={{md:12, lg:2}}>
                            {handleSelected()}
                        </Grid>
                        <Grid item size={{md:12, lg:2}}>
                            <IconButton onClick={zoomProfile} title={"goToProfileButton"}>
                                <ArrowForward></ArrowForward>
                            </IconButton>
                        </Grid>
                    </Grid>

                </Grid>



            </Grid>
        }else{
            return <Box></Box>
        }

    }

    return (
        parse()
    );
}

export default ProfilePreviewComponent;