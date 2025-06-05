import React from "react";
import CommentSubmitFormComponent from "./CommentSubmitFormComponent";
import RedditVoteComponent from "../postThreads/RedditVoteComponent";
import {Card, Grid, Stack, Typography} from "@mui/material";
import * as PropTypes from "prop-types";




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
        return (<Card sx={{padding:"2em"}} elevation={4}>
            <Grid container>
                <Grid item size={12}>
                    <Stack>
                        <Typography  variant={"h5"}component={"h4"} onClick={()=>this.zoomToUser("reddit",this.state.comment.author)}>{this.state.comment.author}</Typography>
                        <Typography component={"p"}>{this.state.comment.body}</Typography>
                    </Stack>
                </Grid>
                <Grid item size={2}>
                    <RedditVoteComponent upvote={this.upvote.bind(this)}
                                         downvote={this.downvote.bind(this)}
                                         unvote={this.unvote.bind(this)}
                                         getPost={this.getCommentInfo.bind(this)}
                                         isComment={true}
                    ></RedditVoteComponent>
                </Grid>
                <Grid item size={10}>
                    <CommentSubmitFormComponent replyFunction={this.reply.bind(this)}
                                                isComment={true}
                    ></CommentSubmitFormComponent>
                </Grid>
            </Grid>
            {this.printReplies()}
        </Card>)
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