import {
    Box,Grid
} from "@mui/material";
import React from "react";
import BlueskyMainViewComponent from "./BlueskyMainViewComponent";
import RedditMainViewComponent from "./RedditMainViewComponent";

/**
 * Multi feed main view component
 * @param props Properties
 * @returns The rendered component
 * @constructor None
 */
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