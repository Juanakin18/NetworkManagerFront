import React from "react";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import parse from "html-react-parser";
import RedditVoteComponent from "./RedditVoteComponent";
import {Box, Button, Card, Grid, Stack, Typography, List, ListItem, CardMedia} from "@mui/material";

/**
 * Reddit thread component
 */
class RedditThreadComponent extends ThreadComponent{


    /**
     * Constructor function
     * @param props The properties
     */
    constructor(props) {
        super(props);
        this.state.zoomSubreddit=props.zoomSubreddit

    }
    doFormatPost(){
        return <div>
            {this.parsePost()}
        </div>;
    }

    /**
     * Parses the post
     * @returns The parsed post
     */
    parsePost(){
        var post = this.state.post.post;
        console.log(post)
        var parsedImage = <Box></Box>
        var url = post.url;
        if(url.includes(".jpeg" )|| url.includes(".jpg") || url.includes(".png"))
            parsedImage=<img className={"fullImage"} src={url} alt={"URL"}/>
        else{
            var imageUrl = post.thumbnail;
            if(imageUrl!=undefined && imageUrl!="")
                parsedImage=<img className={"fullImage"} src={imageUrl} alt={"URL"}/>
        }

        var title = post.title;
        var galleryData = post.gallery_data;
        var images = post.media_metadata;
        var imagesParsed = [];
        if(images!=undefined){
            if(galleryData!=undefined){
                var galleryDataItems = galleryData.items;
                parsedImage=<Box></Box>
                for(var i =0; i<galleryDataItems.length; i++){
                    var imageData = galleryDataItems[i].outbound_url
                    var imagesParsedKey = galleryDataItems[i].media_id;
                    var image = images[imagesParsedKey];
                    var source = image.s;
                    if(source!==undefined){
                        var imageUrlData = source.u;
                        imagesParsed.push(<img className={"fullImage"} src={imageUrlData} alt={"URL"}/>)
                    }


                }
            }
        }

        var media = post.secure_media_embed.content;
        var content = post.content;
        if(content==undefined)
            content=post.selftext;

        var path = post.secure_media
        var src = "";
        if(path!=undefined){
            var video = path.reddit_video;

            if(video!=undefined)
                src= video.fallback_url;
        }

        if(path!=undefined){
            parsedImage = <CardMedia sx={{height:"auto", width:"6em"}}className={"previewPostImage"}
                                        component='video'
                                        src={src}
                                        autoPlay
                                        controls
            />
        }else{
            var media = post.secure_media;
            console.log(media);
        }

        if(media!=undefined){
            console.log(media)
            var result = media.replace("&gt;",">");
            result = result.replace("&lt;","<");
            result = result.replace("&lt;","<");
            result = result.replace("&gt",">");
            result = result.substring(0, result.length-1);
            console.log(result)
            media = parse(result);
        }else{

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
                        {content}
                    </Typography>
                    {parsedImage}
                    {imagesParsed}
                    <Box>{media}</Box>
                </Stack>

            </Stack>,
            <Card sx={{display:"flex", flexDirection:"column"}}>
                <Box sx={{marginTop:"1em", display:"flex", flexDirection:"row"}}>
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

    /**
     * Gets a comment
     * @param index The indexes of the comment
     * @returns The comment
     */

    getComment(index){
        var post = this.state.postsService.getSelectedPost();
        var comments = post.comments;
        return comments[index];
    }

    /**
     * Gets the comments
     * @returns The comments
     */
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

    /**
     * Displays the subreddit
     * @param socialMedia The social network
     * @param subreddit The subreddit
     */
    zoomToSubreddit(socialMedia, subreddit){
        this.state.zoomSubreddit(socialMedia, subreddit)
    }

    /**
     * Upvotes the post
     */
    async upvote(){
        await this.state.postsService.vote(this.getPostInfo().id,1);
        await this.refresh();
    }
    /**
     * Downvotes the post
     */
    async downvote(){
        await this.state.postsService.vote(this.getPostInfo().id, -1);
        await this.refresh();
    }
    /**
     * Unvotes the post
     */
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