import React from "react";
import {Button, Typography, Box} from "@mui/material";

class RedditVoteComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            getPost:props.getPost,
            upvote:props.upvote,
            downvote: props.downvote,
            unvote:props.unvote,
            isComment:props.isComment,
            profilesService: props.profilesService
        }
    }
    render() {
        return this.printVotingSection();
    }

    printVotingSection(){
        var post = this.state.getPost();
        var commentSuffix = this.state.isComment ? "Comment" : "";
        var score = <Typography p={2}>{post.score}</Typography>
        if(this.state.profilesService==undefined){
            b1=<Typography>Selecciona un perfil de reddit para votar</Typography>
            b2=<Typography>Selecciona un perfil de reddit para votar</Typography>
            return <Box sx={{display:"flex", flexDirection:"row"}}>
                {b1}
                {score}
                {b2}
            </Box>
        }
        var selectedProfile = this.state.profilesService.getSelectedProfile("reddit");

        var likes = post.likes;
        var b1= <Button className={"upvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}}onClick={this.state.upvote}>Upvote</Button>;
        var b2= <Button className={"downvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.downvote}>Downvote</Button>;


        if(likes==undefined || likes==null){
            if(selectedProfile==undefined || selectedProfile==""){
                b1=<Typography>Selecciona un perfil de reddit para votar</Typography>
                b2=<Typography>Selecciona un perfil de reddit para votar</Typography>
            }
        }else if(likes){
            b1= <Button className={"upvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar upvote</Button>;
        }else{
            b2=<Button  className={"downvote"+commentSuffix}sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.state.unvote}>Quitar Downvote</Button>;
        }
        return <Box sx={{display:"flex", flexDirection:"row"}}>
            {b1}
            {score}
            {b2}
        </Box>
    }
} export default RedditVoteComponent