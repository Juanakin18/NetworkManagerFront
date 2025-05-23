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
import BlueskyMainViewComponent from "./mainViews/BlueskyMainViewComponent";
import RedditMainViewComponent from "./mainViews/RedditMainViewComponent";

function FeedsComponent(props){

    return (
        <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} elevation={3}className={"feeds"}>
            <Grid container>
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


        </Card>

    );
}

export default FeedsComponent;