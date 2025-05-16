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
            <button onClick={this.refresh.bind(this)}>Refrescar</button>
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