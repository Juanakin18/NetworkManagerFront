import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import {Box, Button, Card, Grid, Typography} from "@mui/material";

class SubredditComponent extends FeedComponent{

    getSocialMedia(){
        return "reddit";
    }
    doFormatPosts() {
            return <RedditPostsListComponent getList={this.getPostsFromFeed.bind(this)}
                                             zoom={this.state.zoomPost}
                                             parent={this}
                                             bgColor={"gray.medium"}
            ></RedditPostsListComponent>

    }

    isSubscriber(){
        return this.state.getFeed().user_is_subscriber;
    }

    handleFollow() {
        var isSubscriber = this.isSubscriber();
        if(!isSubscriber)
            return <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.follow.bind(this)}>Seguir</Button>
        else
            return <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.unfollow.bind(this)}>Dejar de seguir</Button>
    }
    getFeedID() {
        return this.state.getFeed().display_name;
    }

    doParse(){
        var feed = this.state.getFeed();
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  >

            <Grid container>
                <Grid item size={12}>
                    <img className={"banner"} src={feed.banner_background_image} alt={feed.display_name}/>
                </Grid>
                <Grid item size={12}>
                    <Box sx={{
                        display:"flex"
                    }}>
                        <img className={"icon"} src={feed.community_icon} alt={feed.display_name}/>
                        <Box sx={{marginRight:"2em", marginLeft:"1em"}}>
                            <Typography variant={"h5"}component={"h5"}>
                                {feed.display_name}
                            </Typography>
                        </Box>

                        <Box sx={{display:"flex"}}>
                            <Box sx={{marginRight:"1em"}}>
                                <Typography>Suscriptores</Typography>
                                <Typography>{feed.subscribers}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{marginRight:"1em"}}>Conectados</Typography>
                                <Typography>{feed.accounts_active}</Typography>
                            </Box>
                            {this.handleFollow()}

                            <Button sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>

    }


}

export default SubredditComponent;