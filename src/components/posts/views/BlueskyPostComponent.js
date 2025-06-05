import React from "react";
import PostComponent from "./PostComponent";
import {Box, Card, Typography, Grid, Container} from "@mui/material";

class BlueskyPostComponent extends PostComponent{


    doFormatPost(){
        var post = this.state.getPostInfo(this.state.index);
        return this.parsear(post);
    }

    displayPost(){
        var post = this.state.getPostInfo(this.state.index);
        this.state.zoomPost("bluesky",post);
    }

    parsear(post){
        var media = <Box>

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

        return (<Grid sx={{paddingTop:"1em", margin:"1em"}}item xs={12}>
            <Card id={this.state.id}elevation={4} sx={{
                padding:3
            }}onClick={()=>{this.displayPost()}}>
            <Box>
                <Box sx={{
                    display:"flex"
                }}>
                        <img className={"icon"} src={post.author.avatar} alt={post.author.displayName}/>
                        <Box sx={{paddingLeft:"1em"}}>
                                <Typography variant={"h5"}component={"h5"}>
                                    {post.author.displayName}
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