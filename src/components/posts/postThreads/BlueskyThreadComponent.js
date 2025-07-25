import React from "react";
import ThreadComponent from "./ThreadComponent";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import {Box, Button, Card, Container, List, Stack, Typography} from "@mui/material";


/**
 * Bluesky thread component
 */
class BlueskyThreadComponent extends ThreadComponent{

    /**
     * Constructor function
     * @param props The properties
     */
    constructor(props) {
        super(props);
        this.state.previous = [];
    }

    doFormatPost(){
        return <div>
            {this.parseMainPost()}
        </div>;
    }

    /**
     * Parses the previous posts of the thread
     * @returns The list
     */
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

    /**
     * Parses the post information
     * @returns The information
     */
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
                        <img id="goToAuthor" className={"icon"} src={post.author.avatar} alt={post.author.displayName} onClick={()=>{this.zoomToUser("bluesky", post.author.handle)}}/>
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
                <Box sx={{marginTop:"1em"}}>
                    <Card>
                        {this.handleViewerInfo(viewerInfo, post)}
                    </Card>
                </Box>
                {this.getShareForm()}
            </Card>
           ]

    }

    /**
     * Handles the viewer information
     * @param viewerInfo The viewer information
     * @param post The post
     * @returns The information
     */
    handleViewerInfo(viewerInfo, post){
        var likeButton = <Button id={"like"}sx={{backgroundColor:"accents.main", color:"accents.text", marginLeft:"1em"}}  onClick={this.like.bind(this)}>Dar like</Button>;
        var repostButton = <Button id={"repost"}sx={{backgroundColor:"accents.main", color:"accents.text", marginLeft:"1em"}}  onClick={this.repost.bind(this)}>Repostear</Button>
        var selectedUser = this.state.profilesService.getSelectedProfile("bluesky");
        let text = <Box></Box>;
        if(selectedUser=="" || selectedUser==undefined){
            text = <Typography sx={{ width:"30%",display: "inline-block", whiteSpace: "pre-line" , marginLeft:"1em"}}>Tienes que seleccionar un perfil de bluesky en el menú lateral para dar like o repostear</Typography>
            likeButton = <Button disabled  onClick={this.like.bind(this)}>Dar like</Button>;
            repostButton = <Button disabled  onClick={this.repost.bind(this)}>Repostear</Button>
        }else if(viewerInfo!=undefined){
            var like = viewerInfo.like;
            if(like!=undefined){
                likeButton = <Button id={"unlike"} sx={{backgroundColor:"accents.main", color:"accents.text", marginLeft:"1em"}}  onClick={this.unlike.bind(this)}>Quitar el like</Button>;
            }
        }
        return <Box sx={{display:"flex", flexDirection:"row"}}>
            <Stack>
                {text}
                <Box sx={{display:"flex", flexDirection:"row"}}>

                    <Typography sx={{marginLeft:"1em"}} component={"p"}>{post.likeCount}</Typography>
                    {likeButton}
                    <Typography sx={{marginLeft:"1em"}} component={"p"}>{post.repostCount}</Typography>
                    {repostButton}
                </Box>
            </Stack>

            {this.displayButtonShare()}

        </Box>
    }
    /**
     * Parses the previous post of the thread
     * @returns The post
     */
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

        return <Card id={"blueskyPreviousPost"+index} sx={{padding:3}} onClick={()=>{this.goBackTo(index)}}>
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

    /**
     * Likes the post
     */
    async like(){
        await this.state.postsService.like(this.state.post.post);
        await this.refresh();
    }
    /**
     * Unlikes the post
     */
    async unlike(){
        await this.state.postsService.unlike(this.state.post.post);
        await this.refresh();
    }

    /**
     * Reposts the post
     */
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
                {this.parsePrevious()}

            </Card>

            <Card>
                <Typography variant={"h5"} component={"h3"}>
                    Posts posteriores
                </Typography>
                <BlueskyPostsListComponent getList={this.getCommentsList.bind(this)}
                                           zoom={this.setPost.bind(this)}
                                           parent={this}
                                           maxHeight={"42vh"}
                                           id={"blueskyReplyPost"}
                                           isReply={true}
                ></BlueskyPostsListComponent>
            </Card>

        </Card>
    }

    /**
     * Gets the comments list
     * @returns The comments list
     */
    getCommentsList(){
        return this.state.post.comments;
    }/**
     * Gets the previous list
     * @returns The previous list
     */
    getPreviousList(){
        return this.state.previous;
    }

    /**
     * Sets the post
     * @param network The social network
     * @param post The post
     */
    async setPost(network,post){
        var post = await this.state.postsService.getPostById(network,post);
        this.state.previous.push(this.state.post);
        this.state.post=post;
        this.setState(this.state)
    }

    /**
     * Goes back to the selected previous post
     * @param index The posts index
     */
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