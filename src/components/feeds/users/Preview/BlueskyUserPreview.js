import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../../pruebas/GenericPreviewComponent";
import UserPreview from "./UserPreview";
class BlueskyUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.avatar;

        return <section className={"userPreview"}>
            <img src={icon} alt={item.handle}/>
            <h4>{item.displayName}</h4>
            <p>{item.handle}</p>
        </section>;
    }
}
export default BlueskyUserPreview;
