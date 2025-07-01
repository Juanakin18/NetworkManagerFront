import UserView from "./UserView";
import BlueskyPostsListComponent from "../posts/postsLists/BlueskyPostsListComponent";
import React from "react";
import {Box, Button, Card, Container, Grid, Stack, Typography} from "@mui/material";

/**
 * Bluesky user view
 */
class BlueskyUserView extends UserView{


    parseTitle() {
        var user = this.state.getUser();
        var banner = user.banner;
        var profileName = user.displayName
        if(profileName=="" || profileName==undefined)
            profileName = user.handle;
        var bannerImage = <Box></Box>
        if(banner!=undefined)
            bannerImage = <img className={"banner"} src={user.banner} alt={user.handle} className={"banner"}/>;
        return <Grid container>
            <Grid item size={12}>
                {bannerImage}
            </Grid>
            <Grid item size={12}>
                <Box sx={{
                    display:"flex"
                }}>
                    <img className={"icon"} src={user.avatar} alt={user.displayName}/>
                    <Box sx={{marginRight:"2em", marginLeft:"1em"}}>
                        <Typography variant={"h5"}component={"h5"}>
                            {profileName}
                        </Typography>
                        <Typography variant={"h6"}component={"h6"}>
                            {user.handle}
                        </Typography>
                    </Box>

                    <Box sx={{display:"flex"}}>
                        <Box sx={{marginRight:"1em"}}>
                            <Typography>Seguidores</Typography>
                            <Typography>{user.followersCount}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{marginRight:"1em"}}>Seguidos</Typography>
                            <Typography>{user.followsCount}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{marginRight:"1em"}}>Posts</Typography>
                            <Typography>{user.postsCount}</Typography>
                        </Box>
                        {this.handleManagement()}

                    </Box>
                </Box>
            </Grid>
        </Grid>
    }

    doParse(){
        var user = this.state.getUser();
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  class="blueskyProfile">

            <Stack>
                {this.parseTitle()}
                <Typography component={"p"}>{user.description}</Typography>
            </Stack>


        </Card>
    }

    getSocialMedia(){
        return "bluesky";
    }


    doFormatPosts() {
        return <BlueskyPostsListComponent getList={this.getPostsList.bind(this)}
                                          zoom={this.state.zoomPost}
                                          parent={this}
        ></BlueskyPostsListComponent>
    }

    areYouFollowing(){
        var user = this.state.getUser();
        var following = user.viewer;
        if(following==undefined)
            return false;
        else
            return user.viewer.following!=undefined;
    }
    getUserName(){
        return this.state.getUser().handle;
    }


}export default BlueskyUserView