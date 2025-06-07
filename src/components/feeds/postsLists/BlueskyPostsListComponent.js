import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import PostsListComponent from "./PostsListComponent";
class BlueskyPostsListComponent extends PostsListComponent{

    constructor(props) {
        super(props);
        this.state.isReply=props.isReply;
    }
    doFormatPost(post, i){
        return (<BlueskyPostComponent post={post}
                                      zoomPost={this.state.zoom}
                                      parent={this}
                                      index={i}
                                      getPostInfo={this.getItem.bind(this)}
                                      id={this.state.id}
                                      isReply={this.state.isReply}
        ></BlueskyPostComponent>)

    }
}
export default BlueskyPostsListComponent;