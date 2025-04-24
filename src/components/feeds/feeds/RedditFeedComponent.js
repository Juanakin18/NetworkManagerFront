import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import FeedComponent from "./FeedComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
class RedditFeedComponent extends  FeedComponent{

    formatTitle() {
        return <h3>Feed de Reddit</h3>
    }
    doFormatPosts(){
        var result =  this.state.postsList.map((post)=>{
            return <RedditPostComponent post={post} zoomPost={this.state.zoomPost}></RedditPostComponent>
        })
        return result;
    }
}

export default RedditFeedComponent;