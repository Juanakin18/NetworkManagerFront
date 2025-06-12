import React,{useState, useEffect} from "react";
import {
    Box,
    Button, Container,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import ProfileListComponent from "./profiles/ProfileListComponent";
import redditIcon from "../media/icons/reddit.png";
import blueskyIcon from "../media/icons/reddit.png";
import AddProfileComponent from "./profiles/AddProfileComponent";


function SidebarComponent(props){
    const drawerWidth = "25vw";

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
            <ProfileListComponent profilesList={props.profilesList} profilesService={props.profilesService} zoomUser={props.zoomUser}></ProfileListComponent>
            </Container>
        </Drawer>
       );
}

export default SidebarComponent;