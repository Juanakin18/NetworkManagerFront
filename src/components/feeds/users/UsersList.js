import React,{useState, useEffect} from "react";
import GenericListComponent from "../../pruebas/GenericListComponent";
import UserPreview from "./UserPreview";
class UsersListComponent extends GenericListComponent{

    formatTitle(){
        return <h4>Posts</h4>
    }
    doFormatItems(item, i){
        return (<UserPreview user={item}
                             getItem={this.getItem}
                             zoom={this.zoom}
                             parent={this}
                             index={i}
        ></UserPreview>)
    }
    doZoom(item){
        this.state.zoom(this.state.redSocial, item)
    }



}
export default UsersListComponent;