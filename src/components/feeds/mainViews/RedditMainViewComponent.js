import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import FeedList from "../feeds/FeedList";
import UsersList from "../users/UsersList";
class RedditMainViewComponent extends  SocialMediaMainViewComponent{

    constructor(props) {
        super(props);
        this.tabs={
            subreddits:this.formatFeedsTab(),
            posts:this.formatPostsTab(),
            users:this.formatUsersTab()
        }
        this.tabNames=[
            "users",
            "posts",
            "subreddits"
        ]
    }
    formatTitle() {
        return <h3>Feed de Reddit</h3>
    }
    getSocialMedia(){
        return "reddit";
    }

    doFormatPosts(){
        return <RedditPostsListComponent getList={this.getPostsList}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></RedditPostsListComponent>
    }

    doFormatFeedName() {
        return "Subreddits";
    }
    doFormatUsers(){
        return <UsersList getList={this.getUsersList}
                                zoom={this.state.zoomUser}
                                parent={this}
        ></UsersList>
    }



}

export default RedditMainViewComponent;