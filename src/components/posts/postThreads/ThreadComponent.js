import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ShareComponent from "./ShareComponent";
import {Box, Button, Card, Grid} from "@mui/material";

class ThreadComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            postsService: props.postsService,
            zoomUser: props.zoomUser,
            zoomPost:props.zoomPost,
            profilesService:props.profilesService,
            shareDisplayed:false
        }
    }


    formatPost(){
        return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  className={"post"}>
            <Grid container>
                <Grid item size={12}>
                    {this.doFormatPost()}
                </Grid>
                <Grid item size={12} >
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
            <CommentSubmitFormComponent replyFunction={this.replyToPost.bind(this)}
                                        profilesService={this.state.profilesService}
                                        socialMedia={this.getSocialMedia()}
                                        refresh={this.refresh.bind(this)}
            ></CommentSubmitFormComponent>

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
        await this.refresh();
    }

    displayButtonShare(){
        return <Button sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.displayShare.bind(this)}>Compartir</Button>
    }

    displayShare(){
        this.state.shareDisplayed = !this.state.shareDisplayed;
        this.setState(this.state);
    }

    getShareForm(){
        if(this.state.shareDisplayed)
            return  <Box sx={{margin:"1em",width:"100%"}}>
                <ShareComponent profilesService={this.state.profilesService}
                                postsService = {this.state.postsService}
                                getPost = {this.getPostInfo.bind(this)}
                                socialMedia={this.getSocialMedia()}
                >
                </ShareComponent>
            </Box>
        else
            return <Box></Box>
    }
}
export default ThreadComponent;