import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../pruebas/GenericPreviewComponent";
class FeedPreviewComponent extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.icon_img;

        return <section className={"userPreview"}>
            <img src={icon} alt={item.display_name_prefixed}/>
            <h5>{item.display_name_prefixed}</h5>
        </section>;
    }


}
export default FeedPreviewComponent;
