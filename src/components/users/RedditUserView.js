import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../posts/postsLists/RedditPostsListComponent";
import {Box, Button, Card, Grid, Stack, Typography} from "@mui/material";
import SocialMediaIconComponent from "../SocialMediaIconComponent";

/**
 * Reddit user view
 */
class RedditUserView extends UserView{

    parseTitle() {
        var user = this.state.getUser();
        var banner = user.banner;
        var bannerImage = <Box></Box>
        var icon = user.snoovatar_img;
        var img =<SocialMediaIconComponent socialMedia={"reddit"}></SocialMediaIconComponent>
        if(icon==undefined){
            img = <SocialMediaIconComponent socialMedia={"reddit"}></SocialMediaIconComponent>
        }
        if(banner!=undefined)
            bannerImage = <img className={"banner"} src={user.banner} alt={user.name} className={"banner"}/>;
        return <Grid container>
            <Grid item size={12}>
                {bannerImage}
            </Grid>
            <Grid item size={12}>
                <Box sx={{
                    display:"flex"
                }}>
                    {img}
                    <Box sx={{marginRight:"2em", marginLeft:"1em"}}>
                        <Typography variant={"h5"}component={"h5"}>
                            {user.name}
                        </Typography>
                    </Box>

                    <Box sx={{display:"flex"}}>
                        <Box sx={{marginRight:"1em"}}>
                            <Typography>Karma</Typography>
                            <Typography>{user.total_karma}</Typography>
                        </Box>
                        {this.handleManagement()}

                    </Box>
                </Box>
            </Grid>
        </Grid>
    }

    doParse(){
        var user = this.state.getUser();
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} >

            <Stack>
                {this.parseTitle()}
                <Typography component={"p"}>{user.description}</Typography>
            </Stack>

        </Card>
    }

    getSocialMedia(){
        return "reddit";
    }


    doFormatPosts() {
        return <RedditPostsListComponent getList={this.getPostsList.bind(this)}
                                          zoom={this.state.zoomPost}
                                          parent={this}
        ></RedditPostsListComponent>
    }


    handleManagement() {
        return <Box>
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }


    areYouFollowing(){
        return this.state.getUser().is_friend;
    }

    getUserName(){
        return this.state.getUser().name;
    }


}export default RedditUserView