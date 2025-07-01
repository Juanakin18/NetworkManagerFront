import React from "react";
import UsersListComponent from "./UsersList";
import RedditUserPreview from "../previews/RedditUserPreview";
/**
 * Reddit users list component
 */
class RedditUsersListComponent extends UsersListComponent{


    doFormatItems(item, i){
        return (<RedditUserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></RedditUserPreview>)
    }

    getSocialMedia(){
        return "reddit";
    }

    getUserHandle(item){
        return item.name;
    }


}
export default RedditUsersListComponent;