import React from "react";
import PostComponent from "./PostComponent";

class RedditPostComponent extends PostComponent{
    constructor(props) {
        super(props);
        this.state.score = props.post.score;
        this.state.comments = props.post.comments;
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
                <p>{this.state.score}</p>
                <p>{this.state.comments}</p>
            </div>)
    }

}
export default RedditPostComponent;