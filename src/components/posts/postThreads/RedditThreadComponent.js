import React from "react";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import parse from "html-react-parser";
import RedditVoteComponent from "./RedditVoteComponent";
import {Box, Button, Card, Grid, Stack, Typography, List, ListItem} from "@mui/material";

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
                        <Typography  id={"redditPostTitle"}variant={"h5"}component={"h2"}>
                            {title}</Typography>
                    </Grid>
                    <Grid item size={6}>
                        <Button align="left"sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
                    </Grid>
                    <Grid item size={6}>
                        <Typography  variant={"h5"}component={"h3"} onClick={()=>this.zoomToUser("reddit",post.author) } id={"goToAuthor"}>Autor:{post.author}</Typography>
                    </Grid>
                    <Grid item size={6}>
                        <Typography    variant={"h5"}component={"h4"} onClick={()=>this.zoomToSubreddit("reddit",post.subreddit)} id={"toSubreddit"}>Posteado en: {post.subreddit}</Typography>
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
                                         isComment={false}
                                         profilesService={this.state.profilesService}
                    ></RedditVoteComponent>
                    {this.displayButtonShare()}
                </Box>
                {this.getShareForm()}


            </Card>

               ]
    }

    getComment(index){
        var post = this.state.postsService.getSelectedPost();
        var comments = post.comments;
        return comments[index];
    }

    getComments(){
        var post = this.state.postsService.getSelectedPost();
        var comments = post.comments;
        return comments;
    }

    doFormatCommentsList(){
        var comments = this.state.post.comments;
        var result= [];
        for (let i = 0; i < comments.length; i++) {
            var i2=[]
            i2.push(i)
            result.push(<ListItem>
                <RedditCommentComponent
                                        zoomUser={this.state.zoomUser}
                                        replyFunction={this.replyToPost.bind(this)}
                                        refresh={this.refresh.bind(this)}
                                        postsService={this.state.postsService}
                                        profilesService={this.state.profilesService}
                                        index={i2}
                >
                </RedditCommentComponent>
            </ListItem>)
        }
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