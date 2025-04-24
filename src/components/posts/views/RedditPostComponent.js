import React from "react";
import PostComponent from "./PostComponent";

class RedditPostComponent extends PostComponent{
    doFormatPost(){
        return (
            <div>
                <p>{this.state.post.score}</p>
                <p>{this.state.post.comments}</p>
            </div>)
    }
    displayPost(){
        this.state.zoomPost("reddit",this.state.post);
    }

}
export default RedditPostComponent;