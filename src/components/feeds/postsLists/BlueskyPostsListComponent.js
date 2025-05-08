import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import PostsListComponent from "./PostsListComponent";
class BlueskyPostsListComponent extends PostsListComponent{
    doFormatPost(post, i){
        return (<BlueskyPostComponent post={post}
                                      zoomPost={this.state.zoom}
                                      parent={this}
                                      index={i}
                                      getPostInfo={this.getItem.bind(this)}
        ></BlueskyPostComponent>)

    }
}
export default BlueskyPostsListComponent;