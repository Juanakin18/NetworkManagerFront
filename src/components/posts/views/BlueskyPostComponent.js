import React from "react";
import PostComponent from "./PostComponent";

class BlueskyPostComponent extends PostComponent{


    doFormatPost(){
        return (
            <div>
                <p>{this.state.post.likes}</p>
                <p>{this.state.post.reposts}</p>
            </div>)
    }

    displayPost(){
        this.state.zoomPost("bluesky",this.state.post);
    }

}
export default BlueskyPostComponent;