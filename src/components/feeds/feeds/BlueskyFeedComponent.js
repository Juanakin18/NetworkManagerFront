import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import FeedComponent from "./FeedComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
class BlueskyFeedComponent extends  FeedComponent{

    formatTitle() {
        return <h3>Feed de Bluesky</h3>
    }

    async doFetchPosts(){
      if(this.state.searchTerm!=undefined&&this.state.searchTerm!="" ){
            var posts = await this.state.postsService.findPosts("bluesky", this.state.searchTerm);
            return posts;
        }else{
            var posts = await this.state.postsService.findDefault("bluesky");
            return posts;
        }
    }

    doFormatSearch(){

    }

    doFormatPosts(){
        var result =  this.state.postsList.map((post)=>{
            return <BlueskyPostComponent post={post} zoomPost={this.state.zoomPost}></BlueskyPostComponent>
        })
        return result;
    }
}

export default BlueskyFeedComponent;