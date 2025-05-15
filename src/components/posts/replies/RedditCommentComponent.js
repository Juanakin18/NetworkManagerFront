import React from "react";
import CommentSubmitFormComponent from "./CommentSubmitFormComponent";
import RedditVoteComponent from "../postThreads/RedditVoteComponent";
class RedditCommentComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            comment:props.comment,
            zoomUser:props.zoomUser,
            replyFunction:props.replyFunction,
            postsService:props.postsService,
            refresh: props.refresh
        }
    }
    formatPost(){
        return (<section>
            <h4 onClick={()=>this.zoomToUser("reddit",this.state.comment.author)}>Autor:{this.state.comment.author}</h4>
            <p>{this.state.comment.body}</p>
            <section>
                <CommentSubmitFormComponent replyFunction={this.reply.bind(this)}
                ></CommentSubmitFormComponent>
                <RedditVoteComponent upvote={this.upvote.bind(this)}
                                     downvote={this.downvote.bind(this)}
                                     unvote={this.unvote.bind(this)}
                                     getPost={this.getCommentInfo.bind(this)}
                ></RedditVoteComponent>
            </section>
            {this.printReplies()}
        </section>)
    }

    render(){
        return (this.formatPost());
    }

    getCommentInfo(){
        return this.state.comment;
    }

    async upvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,1);
        await this.refresh();
    }

    async downvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,-1);

        await this.refresh();
    }

    async unvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,0);
        await this.refresh();
    }

    async reply(content){

        var post = this.getCommentInfo().id;
        var network = "reddit";
        var result = await this.state.postsService.replyToComment(network,post,content);
        await this.refresh();
    }

    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }
    async refresh(){
        await this.state.refresh();
    }

    printReplies(){
        var replies = this.getCommentInfo().replies;
        if(replies!=undefined && replies!=""){
            var comments = replies.data.children;
            return comments.map((comment)=>{
                return <RedditCommentComponent comment={comment.data}
                                               zoomUser={this.state.zoomUser}
                                               refresh={this.refresh.bind(this)}
                                               postsService={this.state.postsService}
                >

                </RedditCommentComponent>
            })
        }
    }
}
export default RedditCommentComponent;