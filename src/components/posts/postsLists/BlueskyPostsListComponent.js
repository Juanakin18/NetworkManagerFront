import React from "react";
import BlueskyPostComponent from "../previews/BlueskyPostComponent";
import PostsListComponent from "./PostsListComponent";

/**
 * Bluesky posts list component
 */
class BlueskyPostsListComponent extends PostsListComponent{

    /**
     * Constructor function
     * @param props The props
     */
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