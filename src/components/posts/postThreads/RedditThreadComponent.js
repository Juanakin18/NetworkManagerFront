import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";

class RedditThreadComponent extends ThreadComponent{

    doFormatPost(){
        return <div>
            <p>{this.state.post.score}</p>
            <p>{this.state.post.comments}</p>
        </div>;
    }
    doFormatComment(comment){
        return <RedditCommentComponent comment={comment}></RedditCommentComponent>
    }



}
export default RedditThreadComponent;