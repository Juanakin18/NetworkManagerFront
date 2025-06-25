import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import RedditPostComponent from "../posts/previews/RedditPostComponent";
import RedditPostsListComponent from "../posts/postsLists/RedditPostsListComponent";
import FeedList from "../feeds/FeedList";
import UsersList from "../users/lists/UsersList";
import RedditUsersListComponent from "../users/lists/RedditUsersListComponent";
class RedditMainViewComponent extends  SocialMediaMainViewComponent{

    constructor(props) {
        super(props);
        this.tabs={
            subreddits:this.formatFeedsTab,
            posts:this.formatPostsTab,
            users:this.formatUsersTab
        }
        this.tabNames=[
            "users",
            "posts",
            "subreddits"
        ]
        this.postCriteria=[
            {id:"text",
                text:"Contenido"},
            {id:"feed",
                text:"Subreddit"},
            {
                id:"user",
                text:"Autor"
            }

        ];
    }
    formatTitle() {
        return "Feed de Reddit"
    }
    getSocialMedia(){
        return "reddit";
    }

    doFormatPosts(){
        return <RedditPostsListComponent getList={this.getPostsList.bind(this)}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></RedditPostsListComponent>
    }

    doFormatFeedName() {
        return "Subreddits";
    }
    doFormatUsers(){
        return <RedditUsersListComponent getList={this.getUsersList.bind(this)}
                                zoom={this.state.zoomUser}
                                parent={this}
        ></RedditUsersListComponent>
    }



}

export default RedditMainViewComponent;