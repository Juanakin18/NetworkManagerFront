import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
function ProfilePreviewComponent(props){

    const [profileLogin,setProfileLogin] = useState(props.login);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia);


    return (
        <Box>
            <p>{socialMedia} : {profileLogin}</p>
        </Box>
    );
}

export default ProfilePreviewComponent;