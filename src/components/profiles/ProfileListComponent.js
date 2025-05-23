import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, TextField} from "@mui/material";
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
                return <ProfilePreviewComponent login={red.profile} socialMedia={red.socialMedia} profilesService={profilesService} zoom={props.zoomUser}>
                </ProfilePreviewComponent>
            });
            return list;
        }
        return [];

    }

    return (<div>
        <Button sx={{bgcolor:"accents.main", color:"accents.text", marginTop:"1em"}} onClick={fetchList}>Cargar perfiles</Button>
            {formatList()}
    </div>);
}

export default ProfileListComponent;