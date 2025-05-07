import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
function ProfilePreviewComponent(props){

    const [profileLogin,setProfileLogin] = useState(props.login);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia);
    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [selected, setSelected] = useState(props.selected);

    async function selectProfile(){
        var result = await profilesService.selectProfile(profileLogin, socialMedia);
        setSelected(true);
    }

    async function selectProfile(){
        var result = await profilesService.deselectProfile();
        setSelected(false);
    }

    async function zoomProfile(){
        var result = await profilesService.zoomProfile(profileLogin, socialMedia);
        props.toggle(socialMedia+"Profile");
    }

    function handleSelected(){
        if(selected)
            return <button onClick={selectProfile}>Seleccionar</button>
        else
            return <button onClick={deselectProfile}>Deseleccionar</button>
    }

    return (
        <Box onClick={zoomProfile}>
            <p>{socialMedia} : {profileLogin}</p>
            {handleSelected()}
        </Box>
    );
}

export default ProfilePreviewComponent;