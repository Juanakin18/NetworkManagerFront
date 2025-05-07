import UserView from "./UserView";
import BlueskyPostsListComponent from "../postsLists/BlueskyPostsListComponent";
import React from "react";

class BlueskyUserView extends UserView{
    doHandleUserName(){
        var user = this.state.getUser();
        return user.name;
    }

    getSocialMedia(){
        return "bluesky";
    }


    doFormatPosts() {
        return <BlueskyPostsListComponent getList={this.getPostsList}
                                          zoom={this.state.zoomPost}
                                          parent={this}
        ></BlueskyPostsListComponent>
    }


}export default BlueskyUserView