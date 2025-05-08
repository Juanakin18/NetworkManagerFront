import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import FeedList from "../feeds/FeedList";
import UsersList from "../users/UsersList";
class BlueskyMainViewComponent extends  SocialMediaMainViewComponent{

    constructor(props) {
        super(props);
        this.tabs={
            feeds:this.formatFeedsTab(),
            posts:this.formatPostsTab(),
            users:this.formatUsersTab()
        }
        this.tabNames=[
            "users",
            "posts"
        ]
    }
    formatTitle() {
        return <h3>Feed de Bluesky</h3>
    }
    getSocialMedia(){
        return "bluesky";
    }

    doFormatPosts(){
        return <BlueskyPostsListComponent getList={this.getPostsList}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></BlueskyPostsListComponent>
    }

    doFormatFeedName() {
        return "Feeds";
    }

    doFormatUsers(){
        return <UsersList getList={this.getUsersList}
                                zoom={this.state.zoomUser}
                                parent={this}
        ></UsersList>
    }
}

export default BlueskyMainViewComponent;