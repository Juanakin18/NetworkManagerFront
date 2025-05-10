import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../../pruebas/GenericPreviewComponent";
import UserPreview from "./UserPreview";
class BlueskyUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.avatar;

        return <section>
            <img src={icon} alt={item.handle}/>
            <h5>{item.displayName}</h5>
            <p>{item.handle}</p>
        </section>;
    }
}
export default BlueskyUserPreview;
