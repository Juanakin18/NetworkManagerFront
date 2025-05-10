import React,{useState, useEffect} from "react";
import GenericListComponent from "../../../pruebas/GenericListComponent";
import UserPreview from "../Preview/UserPreview";
class UsersListComponent extends GenericListComponent{

    formatTitle(){
        return <h4>Posts</h4>
    }
    doFormatItems(item, i){
        return (<UserPreview user={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom}
                             parent={this}
                             index={i}
        ></UserPreview>)
    }

    getUserHandle(item){

    }

    doZoom(item){
        var name = this.getUserHandle(item);
        this.state.zoom(this.getRedSocial(), name)
    }
    getRedSocial(){

    }



}
export default UsersListComponent;