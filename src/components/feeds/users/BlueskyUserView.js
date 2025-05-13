import UserView from "./UserView";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import React from "react";

class BlueskyUserView extends UserView{

    parseTitle() {
        var user = this.state.getUser();
        return <div>
            <img src={user.banner} alt={user.handle} className={"banner"}/>
            <img src={user.avatar} alt={user.handle}/>
            <article>
                <h2>{user.displayName}</h2>
                <p>{user.handle}</p>
                <p>{user.description}</p>
            </article>
        </div>
    }

    doParse(){
        var user = this.state.getUser();
        return <div class="blueskyProfile">

            <article>
                <h3>Información general</h3>
                <div>
                    <h4>Seguidores</h4>
                    <p>{user.followersCount}</p>
                </div>
                <div>
                    <h4>Seguidos</h4>
                    <p>{user.followsCount}</p>
                </div>
                <div>
                    <h4>Posts</h4>
                    <p>{user.postsCount}</p>
                </div>
            </article>
        </div>;
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

    handleManagement(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var displayedProfile = this.state.profilesService.getDisplayedProfile();
        if(displayedProfile==undefined||displayedProfile==null)
            return <p>Seleccione un perfil para seguir a esta persona</p>
        if(displayedProfile==profile)
            return <p>No puedes seguirte</p>
        if(this.areYouFollowing())
            return <button onClick={()=> {
                this.follow(displayedProfile);
            }}>Seguir</button>
        else
            return <button onClick={()=>this.unfollow(displayedProfile)}>Dejar de seguir</button>
    }


}export default BlueskyUserView