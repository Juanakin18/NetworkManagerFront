import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";

class RedditUserView extends UserView{

    parseTitle() {
        var user = this.state.getUser();
        var banner = user.banner;
        var bannerImage = <Box></Box>
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
                    <img className={"icon"} src={user.snoovatar_img} alt={user.name}/>
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
        return <Box></Box>
    }


    areYouFollowing(){
        return this.state.getUser().is_friend;
    }

    getUserName(){
        return this.state.getUser().name;
    }


}export default RedditUserView