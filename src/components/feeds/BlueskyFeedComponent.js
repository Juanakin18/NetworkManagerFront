import React from "react";
import FeedComponent from "./FeedComponent";
import BlueskyPostsListComponent from "../posts/postsLists/BlueskyPostsListComponent";

/**
 * Bluesky feed component
 */
class BlueskyFeedComponent extends FeedComponent{

    /**
     * Returns the social media
     * @returns Bluesky
     */
    getSocialMedia(){
        return "bluesky";
    }

    /**
     * Formats the posts list
     * @returns A BlueskyPostsListComponent
     */
    doFormatPosts() {
        return <BlueskyPostsListComponent getList={this.getPostsFromFeed}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></BlueskyPostsListComponent>

    }
}

export default BlueskyFeedComponent;