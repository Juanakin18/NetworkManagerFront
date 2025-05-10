import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../../pruebas/GenericPreviewComponent";
import UserPreview from "./UserPreview";
class RedditUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.snoovatar_img;

        return <section>
            <img src={icon} alt={item.name}/>
            <h5>{item.name}</h5>
        </section>;
    }
}
export default RedditUserPreview;
