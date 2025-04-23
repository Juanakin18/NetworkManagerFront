import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import FeedComponent from "./FeedComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
class BlueskyFeedComponent extends  FeedComponent{

    doFormatPosts(){
        var result =  this.state.postsList.map((post)=>{
            return <BlueskyPostComponent post={post}></BlueskyPostComponent>
        })
        return result;
    }
}

export default BlueskyFeedComponent;