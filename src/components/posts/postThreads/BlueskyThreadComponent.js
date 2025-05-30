import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import BlueskyMainViewComponent from "../../feeds/mainViews/BlueskyMainViewComponent";
import BlueskyPostComponent from "../views/BlueskyPostComponent";
import BlueskyPostsListComponent from "../../feeds/postsLists/BlueskyPostsListComponent";
import {Box, Button, Card, Container, List, Stack, Typography} from "@mui/material";
import RedditVoteComponent from "./RedditVoteComponent";
import ShareComponent from "./ShareComponent";

class BlueskyThreadComponent extends ThreadComponent{

    constructor(props) {
        super(props);
        this.state.previous = [];
    }
    doFormatPost(){
        return <div>
            {this.parseMainPost()}
        </div>;
    }

    parsePrevious(){
        var result = [];
        for (let i = 0; i < this.state.previous.length; i++) {
            var post = this.state.previous[i];
           result.push(this.parsePreviousPost(post.post, i));
        }
        return <List sx={{
            margin:"1em",
            maxHeight:"20vh",
            overflow:"auto"
        }} container spacing={6}>
            {result}
        </List>

    }

    parseMainPost(){
        var post = this.state.post.post;
        var viewerInfo = post.viewer;
        var media = <Box>

        </Box>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var imageDisplays=[];
                var images = post.embed.images;
                media=<Box>
                    {images.map((image)=>{
                        return <img className={"fullImage"} src={image.fullsize} alt={image.alt}/>
                    })}
                </Box>
            }
        }

        return [<Stack>
                    <Box sx={{display:"flex", flexDirection:"row"}}>
                        <img className={"icon"} src={post.author.avatar} alt={post.author.displayName} onClick={()=>{this.zoomToUser("bluesky", post.author.handle)}}/>
                        <Stack>
                            <Typography  variant={"h5"}component={"h2"}>
                                {post.author.displayName}
                            </Typography>
                            <Typography  variant={"h5"}component={"h3"}>
                                {post.author.handle}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Button align="left"sx={{backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
                        </Stack>
                    </Box>
                    <Stack>
                        <Typography component={"p"}>{post.record.text}</Typography>
                        {media}
                    </Stack>
                </Stack>,
            <Card sx={{display:"flex", flexDirection:"column"}}>
                <Box sx={{marginTop:"1em", marginLeft:"1em"}}>
                    <Card>
                        {this.handleViewerInfo(viewerInfo, post)}
                    </Card>
                </Box>
                {this.getShareForm()}
            </Card>
           ]

    }

    handleViewerInfo(viewerInfo, post){
        var likeButton = <Button sx={{backgroundColor:"accents.main", color:"accents.text"}}  onClick={this.like.bind(this)}>Dar like</Button>;
        var repostButton = <Button sx={{backgroundColor:"accents.main", color:"accents.text"}}  onClick={this.repost.bind(this)}>Repostear</Button>
        if(viewerInfo!=undefined){
            var like = viewerInfo.like;
            if(like!=undefined){
                likeButton = <Button sx={{backgroundColor:"accents.main", color:"accents.text"}}  onClick={this.unlike.bind(this)}>Quitar el like</Button>;
            }
        }
        return <Box sx={{display:"flex", flexDirection:"row"}}>
            <Typography component={"p"}>{post.likeCount}</Typography>
            {likeButton}
            <Typography component={"p"}>{post.repostCount}</Typography>
            {repostButton}
            {this.displayButtonShare()}

        </Box>
    }

    parsePreviousPost(post, index){
        var media = <Box>

        </Box>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var images = post.embed.images;
                media=<Box>
                    {images.map((image)=>{
                        return <img className={"previewPostImage"} src={image.fullsize} alt={image.alt}/>
                    })}
                </Box>
            }
        }

        return <Card sx={{padding:3}} onClick={()=>{this.goBackTo(index)}}>
                <Box>
                    <Container sx={{
                        display:"flex"
                    }}>
                        <img className={"icon"} src={post.author.avatar} alt={post.author.displayName}/>
                        <Container>
                            <Typography variant={"h5"}component={"h5"}>
                                {post.author.displayName}
                            </Typography>
                            <Typography variant={"h6"}component={"h6"}>
                                {post.author.handle}
                            </Typography>
                        </Container>
                    </Container>
                </Box>
                <Box>
                    <Typography typeof={"h5"}>{post.record.text}</Typography>
                    {media}
                </Box>
                <Typography>{post.content}</Typography>
            </Card>
    }

    async like(){
        await this.state.postsService.like(this.state.post.post);
        await this.refresh();
    }

    async unlike(){
        await this.state.postsService.unlike(this.state.post.post);
        await this.refresh();
    }

    async repost(){
        await this.state.postsService.repost(this.state.post.post);
        await this.refresh();
    }
    doFormatCommentsList(){
        return <Card>

            <Card>
                <Typography variant={"h5"} component={"h3"}>
                    Posts anteriores
                </Typography>
                {this.parsePrevious()};

            </Card>

            <Card>
                <Typography variant={"h5"} component={"h3"}>
                    Posts posteriores
                </Typography>
                <BlueskyPostsListComponent getList={this.getCommentsList.bind(this)}
                                           zoom={this.setPost.bind(this)}
                                           parent={this}
                                           maxHeight={"42vh"}
                ></BlueskyPostsListComponent>
            </Card>

        </Card>
    }

    getCommentsList(){
        return this.state.post.comments;
    }
    getPreviousList(){
        return this.state.previous;
    }

    async setPost(network,post){
        var post = await this.state.postsService.getPostById(network,post);
        this.state.previous.push(this.state.post);
        this.state.post=post;
        this.setState(this.state)
    }

    goBackTo(index){
        var post ={};
        for(var i =0; i<=index; i++){
            post = this.state.previous.pop();
        }
        this.state.post= post;
        this.setState(this.state);
    }

    getSocialMedia(){
        return "bluesky";
    }
    getPostInfo(){
        var post = this.state.post;
        return post.post;
    }

    getPostID() {
        return this.getPostInfo().uri;
    }


}
export default BlueskyThreadComponent;