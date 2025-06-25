import React,{useState, useEffect} from "react";
import GenericListComponent from "../../utils/GenericListComponent";
import UserPreview from "../previews/UserPreview";
import UsersListComponent from "./UsersList";
import BlueskyUserPreview from "../previews/BlueskyUserPreview";
class BlueskyUsersListComponent extends UsersListComponent{


    doFormatItems(item, i){
        return (<BlueskyUserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></BlueskyUserPreview>)
    }

    getRedSocial(){
        return "bluesky";
    }

    getUserHandle(item){
        return item.handle;
    }


}
export default BlueskyUsersListComponent;