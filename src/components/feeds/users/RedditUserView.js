import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import {Card} from "@mui/material";

class RedditUserView extends UserView{
    doParse(){
        var user = this.state.getUser();
        return <Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  class="blueskyProfile">

            <article>
                <h3>Información general</h3>
                <div>
                    <h4>Karma</h4>
                    <p>{user.total_karma}</p>
                </div>
            </article>
        </Card>;
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



    areYouFollowing(){
        return this.state.getUser().is_friend;
    }

    getUserName(){
        return this.state.getUser().name;
    }


}export default RedditUserView