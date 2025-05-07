import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";

class SubredditComponent extends FeedComponent{

    getSocialMedia(){
        return "reddit";
    }
    doFormatPosts() {
            return <RedditPostsListComponent getList={this.getFeed().children}
                                             zoom={this.state.zoomPost}
                                             parent={this}
            ></RedditPostsListComponent>

    }

    doHandleTitle() {
        var feed = this.state.getFeed();
        return <h5>{feed.title}</h5>
    }
}

export default SubredditComponent;