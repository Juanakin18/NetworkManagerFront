import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import parse from "html-react-parser";

class RedditThreadComponent extends ThreadComponent{

    doFormatPost(){
        return <div>
            {this.parsear()}
        </div>;
    }

    parsear(){
        var post = this.state.post;
        console.log(post)
        var url = post.url;
        var title = post.title;
        var media = post.secure_media_embed.content;

        if(media!=undefined){
            console.log(media)
            var result = media.replace("&gt;",">");
            result = result.replace("&lt;","<");
            result = result.replace("&lt;","<");
            result = result.replace("&gt",">");
            result = result.substring(0, result.length-1);
            console.log(result)
            media = parse(result);
        }
        return <section>
            <h3>{title}</h3>
            <img src={url} alt={"URL"}/>
            <div>{media}</div>
            <section>

                <button onClick={this.upvote}>Upvote</button>
                <p>{post.score}</p>
                <button onClick={this.downvote}>Downvote</button>
            </section>

        </section>
    }

    async upvote(){
        await this.state.postsService.vote(this.state.post,1);
    }

    async downvote(){
        await this.state.postsService.vote(this.state.post, -1);
    }

    async unvote(){
        await this.state.postsService.vote(this.state.post, 0);
    }
    doFormatComment(comment){
        return <RedditCommentComponent comment={comment}></RedditCommentComponent>
    }



}
export default RedditThreadComponent;