import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../posts/previews/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import PostsListComponent from "../posts/postsLists/PostsListComponent";
import BlueskyPostComponent from "../posts/previews/BlueskyPostComponent";
import RedditPostsListComponent from "../posts/postsLists/RedditPostsListComponent";
import BlueskyPostsListComponent from "../posts/postsLists/BlueskyPostsListComponent";

class BlueskyFeedComponent extends FeedComponent{

    getSocialMedia(){
        return "bluesky";
    }

    doFormatPosts() {
        return <BlueskyPostsListComponent getList={this.getPostsFromFeed}
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