import React from "react";
import {Button, Stack, Typography, Box} from "@mui/material";

class RedditVoteComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            getPost:props.getPost,
            upvote:props.upvote,
            downvote: props.downvote,
            unvote:props.unvote,
            isComment:props.isComment
        }
    }
    render() {
        return this.printVotingSection();
    }

    printVotingSection(){
        var commentSuffix = this.state.isComment ? "Comment" : "";
        var post = this.state.getPost();
        var likes = post.likes;
        var b1= <Button id={"toggleUpvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={this.state.upvote}>Upvote</Button>;
        var b2= <Button id={"toggleDownvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.downvote}>Downvote</Button>;
        var score = <Typography p={2}>{post.score}</Typography>
        if(likes==undefined || likes==null){
        }else if(likes){
            b1= <Button id={"toggleUpvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar upvote</Button>;
        }else{
            b2=<Button  id={"toggleDownvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar Downvote</Button>;
        }
        return <Box sx={{display:"flex", flexDirection:"row"}}>
            {b1}
            {score}
            {b2}
        </Box>
    }
} export default RedditVoteComponent