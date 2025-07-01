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
                <Grid item  size={{md:6, sm:12}}>
                    <BlueskyMainViewComponent postsList={props.blueskyPostsList}
                                              zoomPost={props.zoomPost}
                                              zoomUser={props.zoomUser}
                                              zoomFeed={props.zoomFeed}
                                              postsService={props.postsService}
                                              profilesService={props.profilesService}
                                              feedsService={props.feedsService}></BlueskyMainViewComponent>
                </Grid>
                <Grid item  size={{md:6, sm:12}}>
                    <RedditMainViewComponent
                        zoomPost={props.zoomPost}
                        zoomUser={props.zoomUser}
                        zoomFeed={props.zoomFeed}
                        postsService={props.postsService}
                        profilesService={props.profilesService}
                        feedsService={props.feedsService}
                        marginLeft={"0em"}
                    ></RedditMainViewComponent>
                </Grid>
            </Grid>


        </Box>

    );
}

export default MultiFeedMainViewComponent;