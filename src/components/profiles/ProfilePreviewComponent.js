import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, IconButton, TextField, Typography} from "@mui/material";
import {Clear, Done} from "@mui/icons-material";
function ProfilePreviewComponent(props){

    const [profileLogin,setProfileLogin] = useState(props.login);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia);
    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [selected, setSelected] = useState(props.selected);

    async function selectProfile(){
        var result = await profilesService.selectProfile(profileLogin, socialMedia);
        setSelected(true);
    }

    function deselectProfile(){
        var result = profilesService.deselectProfile(socialMedia);
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
        <Box sx={{display:"flex", flexDirection:"row"}} onClick={zoomProfile}>

                <img className={"socialMediaIcon"} src={"NetworkManagerFront/src/media/icons/bluesky.png"} alt={socialMedia}/>

            <Typography sx={{padding:"0.5em"}}>{profileLogin}</Typography>
                {handleSelected()}


        </Box>
    );
}

export default ProfilePreviewComponent;