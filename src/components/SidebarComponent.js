import React,{useState, useEffect} from "react";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ProfileListComponent from "./profiles/ProfileListComponent";
import AddProfileComponent from "./profiles/AddProfileComponent";

function SidebarComponent(props){



    return (<section className={"sidebar"}>
        <button onClick={()=>props.toggle()}>Añadir</button>
        <ProfileListComponent profilesList={props.profilesList} profilesService={props.profilesService}></ProfileListComponent>
    </section> );
}

export default SidebarComponent;