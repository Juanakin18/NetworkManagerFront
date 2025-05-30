import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import parse from "html-react-parser";
import RedditVoteComponent from "./RedditVoteComponent";
import {Box, Button, Card, Container, Grid, Stack, Typography, List, ListItem} from "@mui/material";
import ShareComponent from "./ShareComponent";

class RedditThreadComponent extends ThreadComponent{


    constructor(props) {
        super(props);
        this.state.zoomSubreddit=props.zoomSubreddit

    }
    doFormatPost(){
        return <div>
            {this.parsear()}
        </div>;
    }

    parsear(){
        var post = this.state.post.post;
        console.log(post)
        var url = post.url;
        var title = post.title;
        var media = post.secure_media_embed.content;

        if(media!=undefined){
            console.log(media)
            var result = media.replace("&gt;",">");
            result = result.replace("&lt;","<");
            result = result.replace("&lt;","<");
            result = result.replace("&gt",">");
            result = result.substring(0, result.length-1);
            console.log(result)
            media = parse(result);
        }
        return [<Stack>
                <Grid container>
                    <Grid item size={6}>
                        <Typography  variant={"h5"}component={"h2"}>
                            {title}</Typography>
                    </Grid>
                    <Grid item size={6}>
                        <Button align="left"sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
                    </Grid>
                    <Grid item size={6}>
                        <Typography  variant={"h5"}component={"h3"} onClick={()=>this.zoomToUser("reddit",post.author)}>Autor:{post.author}</Typography>
                    </Grid>
                    <Grid item size={6}>
                        <Typography   variant={"h5"}component={"h4"} onClick={()=>this.zoomToSubreddit("reddit",post.subreddit)}>Posteado en: {post.subreddit}</Typography>
                    </Grid>
                </Grid>
                <Stack>
                    <Typography component={"p"}>
                        {post.content}
                    </Typography>
                    <img className={"fullImage"} src={url} alt={"URL"}/>
                    <Box>{media}</Box>
                </Stack>

            </Stack>,
            <Card sx={{display:"flex", flexDirection:"column"}}>
                <Box sx={{marginTop:"15%", marginLeft:"5%", display:"flex", flexDirection:"row"}}>
                    <RedditVoteComponent upvote={this.upvote.bind(this)}
                                         downvote={this.downvote.bind(this)}
                                         unvote={this.unvote.bind(this)}
                                         getPost={this.getPostInfo.bind(this)}
                    ></RedditVoteComponent>
                    {this.displayButtonShare()}
                </Box>
                {this.getShareForm()}


            </Card>

               ]





    }


    doFormatCommentsList(){
        var comments = this.state.post.comments;
        var result = comments.map((comment)=>{
            return <ListItem>
                <RedditCommentComponent comment={comment}
                                        zoomUser={this.state.zoomUser}
                                        replyFunction={this.replyToPost.bind(this)}
                                        refresh={this.refresh.bind(this)}
                                        postsService={this.state.postsService}
                >
                </RedditCommentComponent>
            </ListItem>
        })
        return <Stack sx={{padding:"1em"}}>
            <Typography variant={"h5"}component={"h3"}>Comentarios</Typography>
        <List sx={{
            margin:"1em",
            maxHeight:"42vh",
            overflow:"auto"
        }} container spacing={6}>
            {result}
        </List>
        </Stack>
    }

    zoomToSubreddit(socialMedia, subreddit){
        this.state.zoomSubreddit(socialMedia, subreddit)
    }
    async upvote(){
        await this.state.postsService.vote(this.getPostInfo().id,1);
        await this.refresh();
    }

    async downvote(){
        await this.state.postsService.vote(this.getPostInfo().id, -1);
        await this.refresh();
    }

    async unvote(){
        await this.state.postsService.vote(this.getPostInfo().id, 0);
        await this.refresh();
    }

    getSocialMedia(){
        return "reddit";
    }
    getPostInfo(){
        var post = this.state.post;
        return post.post;
    }
    getPostID() {
        return this.getPostInfo().id;
    }



}
export default RedditThreadComponent;