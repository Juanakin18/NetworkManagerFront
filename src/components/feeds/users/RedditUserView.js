import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";

class RedditUserView extends UserView{
    doParse(){
        var user = this.state.getUser();
        return <div class="blueskyProfile">

            <article>
                <h3>Información general</h3>
                <div>
                    <h4>Karma</h4>
                    <p>{user.total_karma}</p>
                </div>
            </article>
        </div>;
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

    parseTitle() {
        var user = this.state.getUser();
        return <div>
            <img src={user.snoovatar_img} alt={user.name}/>
            <article>
                <h2>{user.name}</h2>
                <p>{user.about}</p>
            </article>
        </div>
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


}export default RedditUserView