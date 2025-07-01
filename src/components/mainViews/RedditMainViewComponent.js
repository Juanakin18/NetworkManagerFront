import React from "react";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import RedditPostsListComponent from "../posts/postsLists/RedditPostsListComponent";
import RedditUsersListComponent from "../users/lists/RedditUsersListComponent";

/**
 * Reddit Main View Component
 */
class RedditMainViewComponent extends  SocialMediaMainViewComponent{

    /**
     * Constructor function
     * @param props The properties
     */
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