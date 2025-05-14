import React from "react";
import FeedList from "../feeds/FeedList";

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
    async doFollow(profile){
        var feed = this.state.getUser();
        var result = await this.state.usersService.follow(this.getSocialMedia(), profile, feed);
        await this.refresh();
    }

    async doUnfollow(profile){
        var feed = this.state.getUser();
        var result = await this.state.usersService.unfollow(this.getSocialMedia(), profile, feed);
        await this.refresh();

    }

    async refresh(){
        var profile = this.getUserName();
        var user = await this.profilesService.getProfileInfo(profile, this.getSocialMedia());
        var result = await this.postsService.findPostsFromUser(this.getSocialMedia(),profile,"",this.profilesService.getSelectedProfile(this.getSocialMedia()));
        this.profilesService.setDisplayedProfile(user);
        this.state.user = user;
        this.setState(user);
    }

    getUserName(){

    }

    handleManagement(){

        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var displayedProfile = this.state.profilesService.getDisplayedProfile();
        if(profile==undefined||profile==null)
            return <p>Seleccione un perfil para seguir a esta persona</p>
        if(displayedProfile==profile)
            return <p>No puedes seguirte</p>
        if(!this.areYouFollowing())
            return <button onClick={()=> {
                this.follow(displayedProfile);
            }}>Seguir</button>
        else
            return <button onClick={()=>this.unfollow(displayedProfile)}>Dejar de seguir</button>
    }

    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }
    render(){
        return<div>
            {this.parseTitle()}
            {this.handleManagement()}
            {this.parse()}

            <section>
                <h4>Posts</h4>
                {this.formatPosts()}
            </section>
        </div>;
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