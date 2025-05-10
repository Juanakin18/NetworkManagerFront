import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";

class RedditUserView extends UserView{
    doParse(){
        var user = this.state.getUser();
        return <div class="blueskyProfile">
            <img src={user.snoovatar_img} alt={user.name}/>
            <article>
                <h2>{user.name}</h2>
                <p>{user.about}</p>
            </article>
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


}export default RedditUserView