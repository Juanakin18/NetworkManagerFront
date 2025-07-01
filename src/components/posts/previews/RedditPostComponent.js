import React from "react";
import PostComponent from "./PostComponent";
import parse from "html-react-parser";
import {Box, Card, CardMedia, Container, Grid, Stack, Typography} from "@mui/material";

/**
 * Reddit post preview component
 */
class RedditPostComponent extends PostComponent{
    doFormatPost(){
        var post = this.state.getPostInfo(this.state.index)
        return (
            <Box sx={{margin:"1em"}}>
                {this.parsePreviewPost(post)}
            </Box>)
    }
    /**
     * Parses the post preview
     * @param post The post
     * @returns The post preview
     */
    parsePreviewPost(post){
        console.log(post)
        var thumbnail = post.thumbnail;
        var url = post.url;
        var title = post.title;
        var media = post.secure_media_embed.content;
        var thumbnailImage= <Box></Box>;

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
        if(thumbnail!="self"  ){
            thumbnailImage=<img className={"previewPostImage"}src={thumbnail} alt={"Thumbnail"} />
            if(thumbnail=="nsfw"){
                thumbnailImage =  <Typography>Este contenido es NSFW</Typography>
            }else if(thumbnail=="spoiler"){
                thumbnailImage =  <Typography>Este contenido es un Spoiler</Typography>
            }else if(thumbnail.includes("external-preview.redd.it")){
                var path = post.secure_media
                var src = "";
                if(path!=undefined){
                    var video = path.reddit_video;

                    if(video!=undefined)
                        src= video.fallback_url;
                }

                if(path!=undefined){
                    thumbnailImage = <CardMedia className={"previewPostImage"}
                                                component='video'
                                                src={src}
                                                autoPlay
                                                controls
                    />
                }else{
                    var media = post.secure_media;
                    console.log(media);
                }

            }
        }


        return  <Grid  sx={{paddingTop:"1em", margin:"0.1em"}}item xs={12}>
            <Card className={"redditPost"} elevation={4} sx={{
                padding:3, cursor:"pointer"
            }}onClick={()=>{this.displayPost()}}>
                <Box>
                    <Box sx={{
                        display:"flex"
                    }}>

                        <Stack>
                            <Typography variant={"h5"}component={"h5"}>
                                {post.title}
                            </Typography>
                            <Typography variant={"h5"}component={"h5"}>
                                {post.author}
                            </Typography>
                            <Typography variant={"h6"}component={"h6"}>
                                {post.subreddit}
                            </Typography>
                            {
                                thumbnailImage
                            }
                        </Stack>
                    </Box>
                </Box>
                <Box>


                </Box>
            </Card>
        </Grid>
    }


    displayPost(){
        var post = this.state.getPostInfo(this.state.index);
        this.state.zoomPost("reddit",post);
    }

}
export default RedditPostComponent;