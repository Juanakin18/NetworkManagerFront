import React from "react";
import FeedList from "../feeds/FeedList";
import {Box, Button, Card, Typography} from "@mui/material";

class UserView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getUser:props.profilesService.getDisplayedProfile.bind(props.profilesService),
            zoomPost: props.zoomPost,
            postsService:props.postsService,
            feedsService:props.feedsService,
            usersService:props.usersService,
            profilesService: props.profilesService
        }
    }

    areYouFollowing(){

    }


    async follow(){
        var result = await this.doFollow();
        this.state.following = true;
        this.setState(this.state);
    }

    async unfollow(){
        var result = await this.doUnfollow();
        this.state.following=false;
        this.setState(this.state);
    }

    getSocialMedia(){

    }
    async doFollow(){
        var profileToFollow = this.getUserName();
        var result = await this.state.profilesService.follow(this.getSocialMedia(), profileToFollow);
        await this.refresh();
    }

    async doUnfollow(){
        var profileToUnfollow = this.getUserName();
        var result = await this.state.profilesService.unfollow(this.getSocialMedia(), profileToUnfollow);
        await this.refresh();

    }

    async refresh(){
        var profile = this.getUserName();
        var user = await this.state.profilesService.getProfileInfo(profile, this.getSocialMedia());
        var result = await this.state.postsService.findPostsFromUser(this.getSocialMedia(),profile,"",this.state.profilesService.getSelectedProfile(this.getSocialMedia()));
        this.state.user = user;
        this.setState(user);
    }

    getUserName(){

    }

    handleManagement(){

        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var displayedProfile = this.state.profilesService.getDisplayedProfile();
        var result = <Box></Box>
        if(profile==""||profile==undefined||profile==null)
            return <Typography>Seleccione un perfil de {this.getSocialMedia()} para seguir a esta persona</Typography>;
        if(displayedProfile==profile)
            result= <Typography>No puedes seguirte</Typography>
        if(!this.areYouFollowing())
            result= <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={()=> {
                this.follow(displayedProfile);
            }}>Seguir</Button>
        else
            result = <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={()=>this.unfollow(displayedProfile)}>Dejar de seguir</Button>
        return <Box sx={{display:"flex"}}>
            {result}
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }

    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }
    render(){
        return<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>

            {this.parse()}
            {this.formatPosts()}
        </Card>
    }

    doFormatPosts(){

    }

    parseTitle(){

    }

    parse(){
        return this.doParse();
    }

    doParse(){

    }

    getPostsList(){
        var user = this.state.getUser();
        var profile = {
            nombrePerfil:user.nombrePerfil,
            socialMedia:this.getSocialMedia()
        }
        var list = this.state.postsService.getPostsFromUser(profile);
        return list;
    }


}export default UserView;