import React,{useState, useEffect} from "react";
import GenericListComponent from "../../utils/GenericListComponent";
import UserPreview from "../previews/UserPreview";
import UsersListComponent from "./UsersList";
import RedditUserPreview from "../previews/RedditUserPreview";
class RedditUsersListComponent extends UsersListComponent{


    doFormatItems(item, i){
        return (<RedditUserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></RedditUserPreview>)
    }

    getRedSocial(){
        return "reddit";
    }

    getUserHandle(item){
        return item.name;
    }


}
export default RedditUsersListComponent;