import React,{useState, useEffect} from "react";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ProfileListComponent from "./profiles/ProfileListComponent";
import AddProfileComponent from "./profiles/AddProfileComponent";

function SidebarComponent(props){

    return (<section className={"sidebar"}>
        <ProfileListComponent listaRedes={props.listaRedes}></ProfileListComponent>
        <button onClick={()=>props.toggle()}>Añadir</button>
    </section> );
}

export default SidebarComponent;