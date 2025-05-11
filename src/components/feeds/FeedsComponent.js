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
import BlueskyMainViewComponent from "./mainViews/BlueskyMainViewComponent";
import RedditMainViewComponent from "./mainViews/RedditMainViewComponent";

function FeedsComponent(props){

    return (
        <section className={"feeds"}>
            <BlueskyMainViewComponent postsList={props.blueskyPostsList}
                                      zoomPost={props.zoomPost}
                                      zoomUser={props.zoomUser}
                                      zoomFeed={props.zoomFeed}
                                      postsService={props.postsService}
                                      profilesService={props.profilesService}
                                      feedsService={props.feedsService}></BlueskyMainViewComponent>
            <RedditMainViewComponent
                zoomPost={props.zoomPost}
                zoomUser={props.zoomUser}
                zoomFeed={props.zoomFeed}
                postsService={props.postsService}
            profilesService={props.profilesService}
            feedsService={props.feedsService}></RedditMainViewComponent>
        </section>

    );
}

export default FeedsComponent;