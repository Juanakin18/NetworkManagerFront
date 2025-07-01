import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ShareComponent from "./ShareComponent";
import {Box, Button, Card, Grid} from "@mui/material";

/**
 * Generic thread component
 */
class ThreadComponent extends React.Component{

    /**
     * Constructor function
     * @param props The properties
     */
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


    /**
     * Formats the thread information
     * @returns The formatted information
     */
    formatPost(){
        return (<Card sx={{padding:"0.5em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}}  className={"post"}>
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
    /**
     * Formats the thread information
     * @returns The formatted information
     */
    doFormatPost(){
    }

    /**
     * Formats the comment section
     * @returns The formatted comment section
     */
    formatCommentSection(){
        return <Card>

            <CommentSubmitFormComponent replyFunction={this.replyToPost.bind(this)}
                                        profilesService={this.state.profilesService}
                                        socialMedia={this.getSocialMedia()}
                                        refresh={this.refresh.bind(this)}
            ></CommentSubmitFormComponent>
            {this.formatCommentsList()}
        </Card>
    }

    /**
     * Formats the comments list
     * @returns The comments list
     */
    formatCommentsList(){
       return this.doFormatCommentsList();
    }
    /**
     * Formats the comments list
     * @returns The comments list
     */
    doFormatCommentsList(){

    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return (this.formatPost());
    }

    /**
     * Displays the author
     * @param socialMedia The social network
     * @param user The author
     */
    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }

    /**
     * Returns the social network name
     * @returns The social network name
     */
    getSocialMedia(){

    }
    /**
     * Returns the post info
     * @returns The post info
     */
    getPostInfo(){

    }
    /**
     * Returns the post id
     * @returns The post id
     */
    getPostID(){

    }

    /**
     * Refreshes the component
     */
    async refresh(){
        var network = this.getSocialMedia();
        var postID = this.getPostInfo();
        var post = await this.state.postsService.getPostById(network,postID);
        this.state.post = post;
        this.setState(this.state);
    }

    /**
     * Replies to the post
     * @param postContent The reply
     */
    async replyToPost(postContent){
        var post = this.getPostID();
        var network = this.getSocialMedia();
        var result = await this.state.postsService.replyToPost(network,post,postContent);
        await this.refresh();
        await this.refresh();
    }

    /**
     * Displays the share button
     * @returns The share button
     */
    displayButtonShare(){
        return <Button sx={{backgroundColor:"accents.main", color:"accents.text", marginLeft:"1em"}} onClick={this.displayShare.bind(this)}>Compartir</Button>
    }

    /**
     * Displays the share component
     */
    displayShare(){
        this.state.shareDisplayed = !this.state.shareDisplayed;
        this.setState(this.state);
    }

    /**
     * Returns the share form
     * @returns The share form
     */
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