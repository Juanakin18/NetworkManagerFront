import React from "react";
import PostComponent from "./PostComponent";

class BlueskyPostComponent extends PostComponent{


    doFormatPost(){
        var post = this.state.parent.state.postsList[this.state.index];
        return this.parsear(post);
    }

    displayPost(){
        var post = this.state.parent.state.postsList[this.state.index];
        this.state.zoomPost("bluesky",post);
    }

    parsear(post){
        return <section>
            <h3>{post.content}</h3>
        </section>
    }

}
export default BlueskyPostComponent;