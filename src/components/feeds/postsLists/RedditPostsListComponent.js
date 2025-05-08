import PostsListComponent from "./PostsListComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import React from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";

class RedditPostsListComponent extends PostsListComponent{
    doFormatPost(post, i){
        return (<RedditPostComponent  post={post}
                                      zoomPost={this.state.zoom}
                                      parent={this}
                                      index={i}
                                      getPostInfo={this.getItem.bind(this)}
        ></RedditPostComponent>)

    }
}
export default RedditPostsListComponent;