import React,{useState, useEffect} from "react";
import {Autocomplete, Box, Card, TextField, Typography} from "@mui/material";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import FeedList from "../feeds/FeedList";
import UsersList from "../users/lists/UsersList";
import BlueskyUsersListComponent from "../users/lists/BlueskyUsersListComponent";
class BlueskyMainViewComponent extends  SocialMediaMainViewComponent{

    constructor(props) {
        super(props);
        this.tabs={
            feeds:this.formatFeedsTab,
            posts:this.formatPostsTab,
            users:this.formatUsersTab
        }
        this.tabNames=[
            "users",
            "posts"
        ]

        this.postCriteria=[
            {id:"text",
                text:"Contenido"},
            {
                id:"user",
                text:"Autor"
            }

        ];
    }
    formatTitle() {
        return "Feed de Bluesky";
    }
    getSocialMedia(){
        return "bluesky";
    }

    doFormatPosts(){
        return <BlueskyPostsListComponent getList={this.getPostsList.bind(this)}
                                         zoom={this.state.zoomPost}
                                         parent={this}
        ></BlueskyPostsListComponent>
    }

    doFormatFeedName() {
        return "Feeds";
    }

    doFormatUsers(){
        return <BlueskyUsersListComponent getList={this.getUsersList.bind(this)}
                                zoom={this.state.zoomUser}
                                parent={this}
        ></BlueskyUsersListComponent>
    }
    formatFeedSearch(){
        return[];
    }
}

export default BlueskyMainViewComponent;