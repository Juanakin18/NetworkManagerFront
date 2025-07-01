import React from "react";
import SocialMediaMainViewComponent from "./SocialMediaMainViewComponent";
import BlueskyPostsListComponent from "../posts/postsLists/BlueskyPostsListComponent";
import BlueskyUsersListComponent from "../users/lists/BlueskyUsersListComponent";

/**
 * Bluesky Main View Component
 */
class BlueskyMainViewComponent extends  SocialMediaMainViewComponent{

    /**
     * Constructor function
     * @param props The properties
     */
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