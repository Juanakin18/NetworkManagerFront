import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import {Button, Card, Typography} from "@mui/material";

class SubredditComponent extends FeedComponent{

    getSocialMedia(){
        return "reddit";
    }
    doFormatPosts() {
            return <RedditPostsListComponent getList={this.getPostsFromFeed.bind(this)}
                                             zoom={this.state.zoomPost}
                                             parent={this}
            ></RedditPostsListComponent>

    }

    isSubscriber(){
        return this.state.getFeed().user_is_subscriber;
    }

    handleFollow() {
        var isSubscriber = this.isSubscriber();
        if(!isSubscriber)
            return <Button sx={{bgColor:"accents.main", color:"accents.text"}} onClick={this.follow.bind(this)}>Seguir</Button>
        else
            return <Button sx={{bgColor:"accents.main", color:"accents.text"}} onClick={this.unfollow.bind(this)}>Dejar de seguir</Button>
    }
    getFeedID() {
        return this.state.getFeed().display_name;
    }

    doParse(){
        var feed = this.state.getFeed();
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}   class="blueskyProfile">
            <img src={feed.community_icon} alt={feed.display_name}/>
            <img src={feed.banner_background_image} alt={feed.display_name}/>
            <Card>
                <Typography>{feed.display_name}</Typography>
                <Typography>{feed.public_description}</Typography>
            </Card>
            <Card>
                <Typography>Información general</Typography>
                <Box>
                    <Typography>Suscriptores</Typography>
                    <Typography>{feed.subscribers}</Typography>
                </Box>
                <Box>
                    <Typography>Conectados</Typography>
                    <Typography>{feed.accounts_active}</Typography>
                </Box>
            </Card>
        </Card>;
    }


}

export default SubredditComponent;