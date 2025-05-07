import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import PostsListComponent from "../postsLists/PostsListComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";

class BlueskyFeedComponent extends FeedComponent{

    getSocialMedia(){
        return "bluesky";
    }

    doFormatPosts() {
        return <BlueskyPostsListComponent getList={this.getFeed().children}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></BlueskyPostsListComponent>

    }

    doHandleTitle() {
        var feed = this.state.getFeed();
        return <h5>{feed.title}</h5>
    }
}

export default BlueskyFeedComponent;