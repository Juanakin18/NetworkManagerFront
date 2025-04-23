import React from "react";
import PostComponent from "./PostComponent";

class BlueskyPostComponent extends PostComponent{
    constructor(props) {
        super(props);
        this.state.likes = props.post.likes;
        this.state.reposts = props.post.reposts;
    }
    /*
    const postsList = [
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4
        }
    ]*/

    doFormatPost(){
        return (
            <div>
                <p>{this.state.likes}</p>
                <p>{this.state.reposts}</p>
            </div>)
    }

}
export default BlueskyPostComponent;