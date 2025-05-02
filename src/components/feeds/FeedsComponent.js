import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Toolbar, Typography
} from "@mui/material";
import React from "react";
import BlueskyFeedComponent from "./feeds/BlueskyFeedComponent";
import RedditFeedComponent from "./feeds/RedditFeedComponent";

function FeedsComponent(props){

    return (
        <section className={"feeds"}>
            <BlueskyFeedComponent postsList={props.blueskyPostsList} zoomPost={props.zoomPost} postsService={props.postsService}></BlueskyFeedComponent>
            <RedditFeedComponent  zoomPost={props.zoomPost} postsService={props.postsService}></RedditFeedComponent>
        </section>

    );
}

export default FeedsComponent;