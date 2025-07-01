import React,{useState, useEffect} from "react";
import GenericListComponent from "../../utils/GenericListComponent";
import UserPreview from "../previews/UserPreview";

/**
 * Users list component
 */
class UsersListComponent extends GenericListComponent{

    formatTitle(){
        return <h4>Usuarios</h4>
    }
    doFormatItems(item, i){
        return (<UserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom}
                             parent={this}
                             index={i}
        ></UserPreview>)
    }

    /**
     * Gets the user handle
     * @param item The user
     */
    getUserHandle(item){

    }

    doZoom(item){
        var name = this.getUserHandle(item);
        this.state.zoom(this.getSocialMedia(), name)
    }

    /**
     * Gets the social media
     * @returns The social media
     */
    getSocialMedia(){

    }



}
export default UsersListComponent;