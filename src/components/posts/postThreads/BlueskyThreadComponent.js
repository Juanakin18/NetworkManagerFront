import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import BlueskyFeedComponent from "../../feeds/feeds/BlueskyFeedComponent";
import BlueskyPostComponent from "../views/BlueskyPostComponent";

class BlueskyThreadComponent extends ThreadComponent{

    doFormatPost(){
        return <div>
            <p>{this.state.post.likes}</p>
            <p>{this.state.post.replies}</p>
        </div>;
    }
    doFormatComment(comment){
        return <BlueskyPostComponent post={comment}></BlueskyPostComponent>
    }



}
export default BlueskyThreadComponent;