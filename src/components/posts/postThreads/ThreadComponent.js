import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ShareComponent from "./ShareComponent";
import {Button, Card, Grid} from "@mui/material";

class ThreadComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            postsService: props.postsService,
            zoomUser: props.zoomUser,
            zoomPost:props.zoomPost,
            profilesService:props.profilesService
        }
    }


    formatPost(){
        return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  className={"post"}>
            <Grid container>
                <Grid item size={{lg:6, md:12}}>
                    {this.doFormatPost()}
                </Grid>
                <Grid item size={{lg:5, md:12}} >
                    {this.formatCommentSection()}
                </Grid>
            </Grid>



        </Card>)
    }

    doFormatPost(){
    }

    formatCommentSection(){
        return <Card>
                {this.formatCommentsList()}
            <CommentSubmitFormComponent replyFunction={this.replyToPost.bind(this)}></CommentSubmitFormComponent>

        </Card>
    }

    formatCommentsList(){
       return this.doFormatCommentsList();
    }
    doFormatCommentsList(){

    }

    render(){
        return (this.formatPost());
    }

    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }
    getSocialMedia(){

    }
    getPostInfo(){

    }
    getPostID(){

    }
    async refresh(){
        var network = this.getSocialMedia();
        var postID = this.getPostInfo();
        var post = await this.state.postsService.getPostById(network,postID);
        this.state.post = post;
        this.setState(this.state);
    }

    async replyToPost(postContent){
        var post = this.getPostID();
        var network = this.getSocialMedia();
        var result = await this.state.postsService.replyToPost(network,post,postContent);
        await this.refresh();
    }
}
export default ThreadComponent;