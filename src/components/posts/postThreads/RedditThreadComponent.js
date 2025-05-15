import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import parse from "html-react-parser";
import RedditVoteComponent from "./RedditVoteComponent";

class RedditThreadComponent extends ThreadComponent{


    constructor(props) {
        super(props);
        this.state.zoomSubreddit=props.zoomSubreddit
    }
    doFormatPost(){
        return <div>
            {this.parsear()}
        </div>;
    }

    parsear(){
        var post = this.state.post.post;
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
            <h4 onClick={()=>this.zoomToUser("reddit",post.author)}>Autor:{post.author}</h4>
            <h5 onClick={()=>this.zoomToSubreddit("reddit",post.subreddit)}>Posteado en: {post.subreddit}</h5>
            <img src={url} alt={"URL"}/>
            <div>{media}</div>
            <RedditVoteComponent upvote={this.upvote.bind(this)}
                                 downvote={this.downvote.bind(this)}
                                 unvote={this.unvote.bind(this)}
                                 getPost={this.getPostInfo.bind(this)}
            ></RedditVoteComponent>


        </section>
    }


    doFormatCommentsList(){
        var comments = this.state.post.comments;
        return comments.map((comment)=>{
            return <RedditCommentComponent comment={comment}
                                           zoomUser={this.state.zoomUser}
                                           replyFunction={this.replyToPost.bind(this)}
                                            refresh={this.refresh.bind(this)}
                                           postsService={this.state.postsService}
            >

            </RedditCommentComponent>
        })
    }

    zoomToSubreddit(socialMedia, subreddit){
        this.state.zoomSubreddit(socialMedia, subreddit)
    }
    async upvote(){
        await this.state.postsService.vote(this.getPostInfo().id,1);
        await this.refresh();
    }

    async downvote(){
        await this.state.postsService.vote(this.getPostInfo().id, -1);
        await this.refresh();
    }

    async unvote(){
        await this.state.postsService.vote(this.getPostInfo().id, 0);
        await this.refresh();
    }

    getSocialMedia(){
        return "reddit";
    }
    getPostInfo(){
        var post = this.state.post;
        return post.post;
    }
    getPostID() {
        return this.getPostInfo().id;
    }



}
export default RedditThreadComponent;