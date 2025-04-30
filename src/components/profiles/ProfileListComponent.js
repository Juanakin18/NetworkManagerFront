import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
import ProfilePreviewComponent from "./ProfilePreviewComponent";
function ProfileListComponent(props){

    const profilesService = props.profilesService;
    const [listaRedes, setListaRedes]= useState(getProfiles());
    function getProfiles(){
        var loggedUser = props.loggedInfo;
        if(loggedUser == undefined)
            return [];
        var listaPerfiles = profilesService.getAllProfiles(loggedUser);
        if(listaPerfiles!=null){
            return listaPerfiles;
        }else{
            return [];
        }
    }
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