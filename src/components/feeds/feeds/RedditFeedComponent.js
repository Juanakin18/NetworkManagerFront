import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import FeedComponent from "./FeedComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
class RedditFeedComponent extends  FeedComponent{

    formatTitle() {
        return <h3>Feed de Reddit</h3>
    }

    async doFetchPosts(){
        if(this.state.subreddit!=undefined && this.state.subreddit!=""){
            var posts = await this.state.postsService.findPostsInFeed("reddit", this.state.subreddit, this.state.searchTerm);
            return posts;
        }else if(this.state.searchTerm!=undefined&&this.state.searchTerm!="" ){
            var posts = await this.state.postsService.findPosts("reddit", this.state.searchTerm);
            return posts;
        }else{
            var posts = await this.state.postsService.findDefault("reddit");
            return posts;
        }
    }

    handleSubreddit(e){
        this.state.subreddit = e.target.value;
    }

    doFormatSearch(){
            return <div>
                <label>
                    Nombre del subreddit
                    <input type={"text"} onInput={this.handleSubreddit.bind(this)}/>
                </label>
                <button onClick={this.fetchPosts.bind(this)}>Buscar por subreddit</button>
            </div>
    }

    doFormatPosts(){
        var result =  [];
        for (var i =0; i<this.state.postsList.length; i++) {
            var post = this.state.postsList[i];
            result.push(<RedditPostComponent post={post} zoomPost={this.state.zoomPost} parent={this} index={i}></RedditPostComponent>)
        }
        return result;
    }
}

export default RedditFeedComponent;