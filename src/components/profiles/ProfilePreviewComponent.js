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

    function deselectProfile(){
        var result = profilesService.deselectProfile(socialMedia);
        setSelected(false);
    }

    async function zoomProfile(){
        props.zoom(socialMedia, props.login, true);
    }

    function handleSelected(){
        if(!selected)
            return <button onClick={selectProfile}>Seleccionar</button>
        else
            return <button onClick={deselectProfile}>Deseleccionar</button>
    }

    return (
        <Box >
            <p>{socialMedia} : {profileLogin}</p>
            {handleSelected()}
            <button onClick={zoomProfile}>Ver</button>
        </Box>
    );
}

export default ProfilePreviewComponent;