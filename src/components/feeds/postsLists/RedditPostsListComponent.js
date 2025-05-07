import PostsListComponent from "./PostsListComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import React from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";

class RedditPostsListComponent extends PostsListComponent{
    doFormatPost(post, i){
        return (<RedditPostComponent  post={post}
                                      zoomPost={this.state.zoomPost}
                                      parent={this}
                                      index={i}
        ></RedditPostComponent>)

    }
}
export default RedditPostsListComponent;