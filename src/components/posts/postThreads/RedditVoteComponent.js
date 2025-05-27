import React from "react";
import {Button, Stack} from "@mui/material";

class RedditVoteComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            getPost:props.getPost,
            upvote:props.upvote,
            downvote: props.downvote,
            unvote:props.unvote
        }
    }
    render() {
        return this.printVotingSection();
    }

    printVotingSection(){
        var post = this.state.getPost();
        var likes = post.likes;
        if(likes==undefined || likes==null)
            return <Stack>

                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={this.state.upvote}>Upvote</Button>
                <p>{post.score}</p>
                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.downvote}>Downvote</Button>
            </Stack>
        else if(likes){
            return <Stack>
                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar upvote</Button>
                <p>{post.score}</p>
                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.downvote}>Downvote</Button>
            </Stack>
        }else
            return <Stack>
                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.upvote}>Upvote</Button>
                <p>{post.score}</p>
                <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar Downvote</Button>
            </Stack>
    }
} export default RedditVoteComponent