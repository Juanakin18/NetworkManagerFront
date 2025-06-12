import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Button, Card, Stack, TextField, Grid} from "@mui/material";
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
            var list=[];
            for (let i = 0; i < listaPerfiles.length; i++) {
                list.push(<Grid item size={12}><ProfilePreviewComponent index={i} profilesService={profilesService} zoom={props.zoomUser}>
                </ProfilePreviewComponent></Grid>)

            }

            return <Grid container sx={{width:"100%"}}>
                {list}
            </Grid>
        }
        return <Stack>

        </Stack>

    }

    return (
        <Stack  sx={{width:"100%"}}>
            <Button sx={{bgcolor:"accents.main", color:"accents.text", marginTop:"1em", width:"100%"}} onClick={fetchList}>Recargar perfiles</Button>
            {formatList()}
        </Stack>
);
}

export default ProfileListComponent;