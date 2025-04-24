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

function NavBarComponent(props){

    return (
        <section className={"feeds"}>
            <BlueskyFeedComponent postsList={props.blueskyPostsList} zoomPost={props.zoomPost}></BlueskyFeedComponent>
            <RedditFeedComponent postsList={props.redditPostsList} zoomPost={props.zoomPost}></RedditFeedComponent>
        </section>

    );
}

export default NavBarComponent;