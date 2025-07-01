import React,{useState} from "react";
import {
    Button, Container,
    Drawer,
    Toolbar
} from "@mui/material";
import ProfileListComponent from "./profiles/ProfileListComponent";

/**
 * Sidebar component
 * @param props The properties
 * @returns The formatted sidebar component
 */
function SidebarComponent(props){
    const drawerWidth = "20vw";

    /**
     * The social media property
     */
    const [getSocialMedia, setGetSocialMedia] = useState(props.getSocialMedia)

    return (
        <Drawer
            variant="permanent"

            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    paddingTop:"2em",
                    bgcolor:"sidebar.main"
                },

            }}
        >
            <Toolbar />
            <Container>
            <Button align={"center"} sx={{bgcolor:"accents.main", color:"accents.text", width:"100%"}} onClick={()=>props.toggle()}>Añadir perfil</Button>
            <ProfileListComponent getSocialMedia={getSocialMedia} profilesList={props.profilesList} profilesService={props.profilesService} zoomUser={props.zoomUser}></ProfileListComponent>
            </Container>
        </Drawer>
       );
}

export default SidebarComponent;