import UserView from "./UserView";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import React from "react";
import {Card} from "@mui/material";

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
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  class="blueskyProfile">

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
        </Card>;
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