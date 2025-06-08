import React from "react";
import CommentSubmitFormComponent from "./CommentSubmitFormComponent";
import RedditVoteComponent from "../postThreads/RedditVoteComponent";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";
import * as PropTypes from "prop-types";




class RedditCommentComponent extends React.Component{

    constructor(props) {
        super();

        var indexParent = props.indexParent;
        this.state = {
            zoomUser:props.zoomUser,
            replyFunction:props.replyFunction,
            postsService:props.postsService,
            profilesService:props.profilesService,
            refresh: props.refresh,
            index:props.index,
            getCommentsList:props.getCommentsList,
            indexParent: indexParent
        }
    }
    formatPost(){
        var comment = this.getCommentInfo();
        if(comment==undefined)
            return <Box></Box>
        return (<Card sx={{padding:"2em"}} elevation={4}>
            <Grid container>
                <Grid item size={12}>
                    <Stack>
                        <Typography  variant={"h5"}component={"h4"} onClick={()=>this.zoomToUser("reddit",comment.author)}>{comment.author}</Typography>
                        <Typography component={"p"}>{comment.body}</Typography>
                    </Stack>
                </Grid>
                <Grid item size={2}>
                    <RedditVoteComponent upvote={this.upvote.bind(this)}
                                         downvote={this.downvote.bind(this)}
                                         unvote={this.unvote.bind(this)}
                                         getPost={this.getCommentInfo.bind(this)}
                                         isComment={true}
                                         profilesService={this.state.profilesService}
                                         index={this.state.index}
                    ></RedditVoteComponent>
                </Grid>
                <Grid item size={10}>
                    <CommentSubmitFormComponent replyFunction={this.reply.bind(this)}
                                                isComment={true}
                                                profilesService={this.state.profilesService}
                                                socialMedia={"reddit"}
                                                index={this.state.index}
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
        return this.state.getCommentsList()[this.state.index];
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
        var replies = this.state.getCommentsList();
        if(replies!=undefined && replies!=""){
            var list = []
            for (let i = 0; i < replies.length; i++) {
                list.push(<RedditCommentComponent zoomUser={this.state.zoomUser}
                                                  refresh={this.refresh.bind(this)}
                                                  postsService={this.state.postsService}
                                                  profilesService={this.state.profilesService}
                                                  getCommentsList={this.getReplies.bind(this)}
                                                  index={i}
                                                  indexParent={this.state.index}

                >

                </RedditCommentComponent>)
            }
            return list;
        }
    }
    getReplies(){
        var comment= this.getCommentInfo();
        var replies = comment.replies;
        if(replies=="")
            return []
        else{
            replies = comment.replies.data.children;
            var repliesList = replies.map((reply)=>reply.data);
            return repliesList;
        }

    }
}
export default RedditCommentComponent;