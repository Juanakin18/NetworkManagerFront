import React from "react";
import GenericPreviewComponent from "../../utils/GenericPreviewComponent";

/**
 * Default user preview
 */
class UserPreview extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.snoovatar_img;

        return <section className={"userPreview"}>
            <img src={icon} alt={item.name}/>
            <h5>{item.name}</h5>
        </section>;
    }
}
export default UserPreview;
