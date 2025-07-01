import React,{useState} from "react";

import {Button, Stack, Grid} from "@mui/material";
import ProfilePreviewComponent from "./ProfilePreviewComponent";

/**
 * Profiles list component
 * @param props The properties
 * @returns {JSX.Element} The component
 */
function ProfileListComponent(props){

    const [profilesService, setProfilesService] = useState(props.profilesService);
    const [profilesList, setProfilesList] = useState([]);
    const [getSelectedSocialMedia, setGetSelectedSocialMedia]=useState(props.getSocialMedia)

    /**
     * Gets the list of profiles
     */
    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfilesList(list);
    }

    /**
     * Filters the profiles
     * @param list The list
     * @param socialMedia The social network to use as a filter
     * @returns The filtered profiles
     */
    function filterProfiles(list, socialMedia){
        if(socialMedia=="multi"){
            return list;
        }
        var filtered = list.filter((profile)=>profile.socialMedia==socialMedia);
        return filtered;
    }

    /**
     * Formats the list
     * @returns The list
     */
     function formatList(){
        var socialMedia = props.getSocialMedia();
        var listaPerfiles1 = profilesService.getSelfProfiles();
        var listaPerfiles = filterProfiles(listaPerfiles1, socialMedia);
        if(listaPerfiles!=[]){
            var list=[];
            for (let i = 0; i < listaPerfiles.length; i++) {
                list.push(<Grid item size={12}>
                    <ProfilePreviewComponent index={i} profilesService={profilesService} zoom={props.zoomUser} socialMedia={socialMedia}>
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