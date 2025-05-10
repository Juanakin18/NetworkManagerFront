import React,{useState, useEffect} from "react";
import GenericListComponent from "../../../pruebas/GenericListComponent";
import UserPreview from "../Preview/UserPreview";
import UsersListComponent from "./UsersList";
import BlueskyUserPreview from "../Preview/BlueskyUserPreview";
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