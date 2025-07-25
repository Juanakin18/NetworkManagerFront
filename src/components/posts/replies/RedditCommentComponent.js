import React from "react";
import CommentSubmitFormComponent from "./CommentSubmitFormComponent";
import RedditVoteComponent from "../postThreads/RedditVoteComponent";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";

/**
 * Reddit comment component
 */
class RedditCommentComponent extends React.Component{

    /**
     * Constructor function
     * @param props The properties
     */
    constructor(props) {
        super();

        var indexParent = props.indexParent;
        this.index = props.index.map((x)=>x);
        this.state = {
            zoomUser:props.zoomUser,
            replyFunction:props.replyFunction,
            postsService:props.postsService,
            profilesService:props.profilesService,
            refresh: props.refresh
        }
    }

    /**
     * Formats the comment
     * @returns The comment
     */
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
                <Grid item size={12} sx={{marginTop:"1em"}}>
                    <RedditVoteComponent upvote={this.upvote.bind(this)}
                                         downvote={this.downvote.bind(this)}
                                         unvote={this.unvote.bind(this)}
                                         getPost={this.getCommentInfo.bind(this)}
                                         isComment={true}
                                         profilesService={this.state.profilesService}
                                         index={this.index}
                    ></RedditVoteComponent>
                </Grid>
                <Grid item size={12}>
                    <CommentSubmitFormComponent replyFunction={this.reply.bind(this)}
                                                isComment={true}
                                                profilesService={this.state.profilesService}
                                                socialMedia={"reddit"}
                                                index={this.index}
                    ></CommentSubmitFormComponent>
                </Grid>
            </Grid>
            {this.printReplies()}
        </Card>)
    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return (this.formatPost());
    }

    /**
     * Gets the comment information
     * @returns The comment information
     */
    getCommentInfo(){
        var index = this.index.map((x)=>x);
        if(index.length==0)
            index=[0]
        return this.state.postsService.getComment(index);
    }

    /**
     * Upvotes the comment
     */
    async upvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,1);
        await this.refresh();
    }
    /**
     * Downvotes the comment
     */
    async downvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,-1);

        await this.refresh();
    }
    /**
     * Unvotes the comment
     */
    async unvote(){
        await this.state.postsService.voteComment("reddit",this.getCommentInfo().id,0);
        await this.refresh();
    }

    /**
     * Replies to the comment
     * @param content The reply content
     */
    async reply(content){

        var post = this.getCommentInfo().id;
        var network = "reddit";
        var result = await this.state.postsService.replyToComment(network,post,content);
        await this.refresh();
    }

    /**
     * Displays the user
     * @param socialMedia The social network
     * @param user The user
     */
    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }

    /**
     * Refreshes the component
     */
    async refresh(){
        await this.state.refresh();
    }

    /**
     * Prints the replies to the comment
     * @returns The comment replies
     */
    printReplies(){
        var info = this.getCommentInfo();
        var replies = this.getCommentsList();
        if(replies!=undefined && replies!=""){
            if(replies.length>0){
                var list = []
                for (let i = 0; i < replies.length; i++) {
                    var i2 = this.index.map((x)=>x);
                    i2.push(i);
                    list.push(<RedditCommentComponent zoomUser={this.state.zoomUser}
                                                      refresh={this.refresh.bind(this)}
                                                      postsService={this.state.postsService}
                                                      profilesService={this.state.profilesService}
                                                      index={i2}

                    >

                    </RedditCommentComponent>)
                }
                if(list!=undefined)
                    return list;
                return [];
            }

        }
        return <Box></Box>
    }

    /**
     * Gets the comments list
     * @returns The comments list
     */
    getCommentsList(){
        var info = this.getCommentInfo();
        var list = info.replies;
        var result = []
        var data = list.data;
        if(data!=undefined){
            var children = data.children;
            if(children!=undefined)
                result = children.map((comment)=>comment.data);
        }
        return result;
    }
}
export default RedditCommentComponent;