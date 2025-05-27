import React,{useState, useEffect} from "react";
import {
    Box,
    Button,
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
    const drawerWidth = 400;


    var b =  <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}

    >
        <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={()=>props.toggle()}>Añadir</Button>
        <ProfileListComponent profilesList={props.profilesList} profilesService={props.profilesService} zoomUser={props.zoomUser}></ProfileListComponent>

    </Drawer>;
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
                    paddingLeft:"1em",
                    bgcolor:"sidebar.main"
                },

            }}
        >
            <Toolbar />
            <Box>
            <Button sx={{bgcolor:"accents.main", color:"accents.text"}} onClick={()=>props.toggle()}>Añadir</Button>
            <ProfileListComponent profilesList={props.profilesList} profilesService={props.profilesService} zoomUser={props.zoomUser}></ProfileListComponent>
            </Box>
        </Drawer>
       );
}

export default SidebarComponent;