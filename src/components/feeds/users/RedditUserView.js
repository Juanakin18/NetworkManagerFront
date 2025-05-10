import UserView from "./UserView";
import React from "react";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";

class RedditUserView extends UserView{
    doHandleUserName(){
        var user = this.state.getUser();
        return user.name;
    }

    getSocialMedia(){
        return "reddit";
    }


    doFormatPosts() {
        return <RedditPostsListComponent getList={this.getPostsList.bind(this)}
                                          zoom={this.state.zoomPost}
                                          parent={this}
        ></RedditPostsListComponent>
    }


}export default RedditUserView