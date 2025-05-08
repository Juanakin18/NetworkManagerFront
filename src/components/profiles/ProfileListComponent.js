import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
import ProfilePreviewComponent from "./ProfilePreviewComponent";
function ProfileListComponent(props){

    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [profilesList, setProfilesList] = useState([]);

    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfilesList(list);
    }


     function formatList(){

        var listaPerfiles = profilesService.getSelfProfiles();
        if(listaPerfiles!=[]){
            var list = listaPerfiles.map((red)=>{
                return <ProfilePreviewComponent login={red.profile} socialMedia={red.socialMedia} profilesService={profilesService}>
                </ProfilePreviewComponent>
            });
            return list;
        }
        return [];

    }

    return (<div>
        <button onClick={fetchList}>Cargar perfiles</button>
            {formatList()}
    </div>);
}

export default ProfileListComponent;