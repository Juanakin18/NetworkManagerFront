import PostsListComponent from "./PostsListComponent";
import BlueskyPostComponent from "../previews/BlueskyPostComponent";
import React from "react";
import RedditPostComponent from "../previews/RedditPostComponent";

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