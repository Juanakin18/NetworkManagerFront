import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import PostsListComponent from "./PostsListComponent";
class BlueskyPostsListComponent extends PostsListComponent{
    doFormatPost(post, i){
        return (<BlueskyPostComponent post={post}
                                      zoomPost={this.state.zoomPost}
                                      parent={this}
                                      index={i}
        ></BlueskyPostComponent>)

    }
}
export default BlueskyPostsListComponent;