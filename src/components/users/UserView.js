import React from "react";
import {Box, Button, Card, Typography} from "@mui/material";

/**
 * User view component
 */
class UserView extends React.Component{
    /**
     * Constructor
     * @param props Properties
     */
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

    /**
     * Returns if you are following the user or not
     * @returns If you are following the user or not
     */
    areYouFollowing(){

    }

    /**
     * Follows the user
     */
    async follow(){
        var result = await this.doFollow();
        this.state.following = true;
        this.setState(this.state);
    }
    /**
     * Unfollows the user
     */
    async unfollow(){
        var result = await this.doUnfollow();
        this.state.following=false;
        this.setState(this.state);
    }

    /**
     * Returns the social media
     * @returns The social media
     */
    getSocialMedia(){

    }

    /**
     * Follows the user
     */
    async doFollow(){
        var profileToFollow = this.getUserName();
        var result = await this.state.profilesService.follow(this.getSocialMedia(), profileToFollow);
        await this.refresh();
    }
    /**
     * Unfollows the user
     */
    async doUnfollow(){
        var profileToUnfollow = this.getUserName();
        var result = await this.state.profilesService.unfollow(this.getSocialMedia(), profileToUnfollow);
        await this.refresh();

    }

    /**
     * Refreshes the component
     */
    async refresh(){
        var profile = this.getUserName();
        var user = await this.state.profilesService.getProfileInfo(profile, this.getSocialMedia());
        var result = await this.state.postsService.findPostsFromUser(this.getSocialMedia(),profile,"",this.state.profilesService.getSelectedProfile(this.getSocialMedia()));
        this.state.user = user;
        this.setState(user);
    }

    /**
     * Gets the user name
     * @returns The user name
     */
    getUserName(){

    }

    /**
     * Handles the management form
     * @returns The management form
     */
    handleManagement(){

        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var displayedProfile = this.state.profilesService.getDisplayedProfile();
        var result = <Box></Box>
        if(profile==""||profile==undefined||profile==null)
            return <Typography>Seleccione un perfil de {this.getSocialMedia()} en el menú lateral para seguir a esta persona</Typography>;
        if(displayedProfile==profile)
            result= <Typography>No puedes seguirte</Typography>
        if(!this.areYouFollowing())
            result= <Button  id={"follow"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={()=> {
                this.follow(displayedProfile);
            }}>Seguir</Button>
        else
            result = <Button id={"unfollow"} sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={()=>this.unfollow(displayedProfile)}>Dejar de seguir</Button>
        return <Box sx={{display:"flex"}}>
            {result}
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }

    /**
     * Formats the user's posts
     * @returns The posts
     */
    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}>

            {this.parse()}
            {this.formatPosts()}
        </Card>
    }
    /**
     * Formats the user's posts
     * @returns The posts
     */
    doFormatPosts(){

    }

    /**
     * Parses the title
     * @returns The title
     */
    parseTitle(){

    }

    /**
     * Parses the user information
     * @returns The information
     */
    parse(){
        return this.doParse();
    }
    /**
     * Parses the user information
     * @returns The information
     */
    doParse(){

    }

    /**
     * Gets the posts list
     * @returns The posts list
     */
    getPostsList(){
        var user = this.state.getUser();
        var profile = {
            nombrePerfil:this.getUserName(),
            socialMedia:this.getSocialMedia()
        }
        var list = this.state.postsService.getPostsFromUser(profile);
        return list;
    }

}export default UserView;