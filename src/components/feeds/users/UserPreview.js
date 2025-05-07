import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../pruebas/GenericPreviewComponent";
class UserPreview extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        return <h5>{item.name}</h5>;
    }
}
export default UserPreview;
