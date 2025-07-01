import React from "react";
import UsersListComponent from "./UsersList";
import BlueskyUserPreview from "../previews/BlueskyUserPreview";

/**
 * Bluesky users list component
 */
class BlueskyUsersListComponent extends UsersListComponent{


    doFormatItems(item, i){
        return (<BlueskyUserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></BlueskyUserPreview>)
    }

    getSocialMedia(){
        return "bluesky";
    }

    getUserHandle(item){
        return item.handle;
    }


}
export default BlueskyUsersListComponent;