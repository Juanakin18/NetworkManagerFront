import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import redditIcon from "../../../media/icons/reddit.png"
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
        var profile = this.state.profilesService.getSelectedProfile("reddit");
        if(profile=="" || profile==undefined)
            return <Typography>Selecciona un perfil de reddit para unirte</Typography>
        var isSubscriber = this.isSubscriber();
        if(!isSubscriber)
            return <Button id={"subredditJoin"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.follow.bind(this)}>Seguir</Button>
        else
            return <Button id={"subredditLeave"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.unfollow.bind(this)}>Dejar de seguir</Button>
    }
    getFeedID() {
        return this.state.getFeed().display_name;
    }

    doParse(){
        var feed = this.state.getFeed();
        var bannerImage=<Box></Box>;
        var banner = feed.banner_img;
        if(banner!=undefined&&banner!="")
            bannerImage=<img className={"banner"} src={banner} alt={feed.display_name}/>;
        var icon = feed.icon_img;
        var iconImage = <img  className={"icon"} src={redditIcon}alt={feed.display_name}/>
        if(icon!=undefined&&icon!="")
            iconImage=<img className={"icon"} src={icon} alt={feed.display_name}/>

        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  >

            <Grid container>
                <Grid item size={12}>
                    {bannerImage}
                </Grid>
                <Grid item size={12}>
                    <Box sx={{
                        display:"flex"
                    }}>
                        {iconImage}
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