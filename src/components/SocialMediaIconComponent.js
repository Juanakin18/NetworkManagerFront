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
import blueskyIcon from "../media/icons/bluesky.png";
import AddProfileComponent from "./profiles/AddProfileComponent";


function SocialMediaIconComponent(props){
    const icons = {
        reddit:redditIcon,
        bluesky:blueskyIcon
    };



    return (
        <img className={"socialMediaIcon"} src={icons[props.socialMedia]} alt={props.socialMedia}/>
    );
}

export default SocialMediaIconComponent;