import React from "react";
import PostComponent from "./PostComponent";
import {Box, Card, Typography, Grid, Container} from "@mui/material";
/**
 * Bluesky post preview component
 */
class BlueskyPostComponent extends PostComponent{


    doFormatPost(){
        var post = this.state.getPostInfo(this.state.index);
        return this.parsePostPreview(post);
    }

    displayPost(){
        var post = this.state.getPostInfo(this.state.index);
        this.state.zoomPost("bluesky",post);
    }

    /**
     * Parses the post preview
     * @param post The post
     * @returns The post preview
     */
    parsePostPreview(post){
        var media = <Box sx={{margin:"1em"}}>

        </Box>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var imageDisplays=[];
                var images = post.embed.images;
                media=<Container>
                    {images.map((image)=>{
                        return <img className={"previewPostImage"} src={image.thumb} alt={image.alt}/>
                    })}
                </Container>
            }
        }
        var profileName = post.author.displayName
        if(profileName=="" || profileName==undefined)
            profileName = post.author.handle;

        var className = "blueskyPost";
        if(className!=undefined)
            className+="Reply";

        return (<Grid sx={{paddingTop:"1em", margin:"1em"}}item xs={12}>
            <Card className={className}id={this.state.id}elevation={4} sx={{
                padding:3, cursor:"pointer"
            }}onClick={()=>{this.displayPost()}}>
            <Box>
                <Box sx={{
                    display:"flex"
                }}>
                        <img className={"icon"} src={post.author.avatar} alt={post.author.displayName}/>
                        <Box sx={{paddingLeft:"1em"}}>
                                <Typography variant={"h5"}component={"h5"}>
                                    {profileName}
                                </Typography>
                                <Typography variant={"h6"}component={"h6"}>
                                    {post.author.handle}
                                </Typography>
                        </Box>
                </Box>
            </Box>
            <Box>
                <Typography typeof={"h5"}>{post.record.text}</Typography>
                {media}
            </Box>
            <Typography>{post.content}</Typography>
            </Card>
        </Grid>);
    }

}
export default BlueskyPostComponent;