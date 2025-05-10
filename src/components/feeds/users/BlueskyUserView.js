import UserView from "./UserView";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import React from "react";

class BlueskyUserView extends UserView{
    doParse(){
        var user = this.state.getUser();
        return <div class="blueskyProfile">
            <img src={user.banner} alt={user.handle} className={"banner"}/>
            <img src={user.avatar} alt={user.handle}/>
            <article>
                <h2>{user.displayName}</h2>
                <p>{user.handle}</p>
                <p>{user.description}</p>
            </article>
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


}export default BlueskyUserView