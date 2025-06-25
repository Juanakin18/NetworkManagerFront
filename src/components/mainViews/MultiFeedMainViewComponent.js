import {
    AppBar,
    Box,
    Button, Card,
    Divider,
    Drawer, Grid, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Toolbar, Typography
} from "@mui/material";
import React from "react";
import BlueskyMainViewComponent from "./BlueskyMainViewComponent";
import RedditMainViewComponent from "./RedditMainViewComponent";

function MultiFeedMainViewComponent(props){

    return (
        <Box>
            <Grid container >
                <Grid item  size={6}>
                    <BlueskyMainViewComponent postsList={props.blueskyPostsList}
                                              zoomPost={props.zoomPost}
                                              zoomUser={props.zoomUser}
                                              zoomFeed={props.zoomFeed}
                                              postsService={props.postsService}
                                              profilesService={props.profilesService}
                                              feedsService={props.feedsService}></BlueskyMainViewComponent>
                </Grid>
                <Grid item size={6}>
                    <RedditMainViewComponent
                        zoomPost={props.zoomPost}
                        zoomUser={props.zoomUser}
                        zoomFeed={props.zoomFeed}
                        postsService={props.postsService}
                        profilesService={props.profilesService}
                        feedsService={props.feedsService}></RedditMainViewComponent>
                </Grid>
            </Grid>


        </Box>

    );
}

export default MultiFeedMainViewComponent;