import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
import ProfilePreviewComponent from "./ProfilePreviewComponent";
function ProfileListComponent(props){

    const [listaRedes, setListaRedes]= useState(props.listaRedes);



    function formatList(){
        var list = listaRedes.map((red)=>{
            return <ProfilePreviewComponent login={red.login} socialMedia={red.socialMedia}>
            </ProfilePreviewComponent>
        });
        return list;
    }

    return (<div>
            {formatList()}
    </div>);
}

export default ProfileListComponent;