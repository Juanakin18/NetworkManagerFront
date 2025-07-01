import React from "react";
import GenericPreviewComponent from "../utils/GenericPreviewComponent";
import {Card, Typography} from "@mui/material";
import redditIcon from "../../media/icons/reddit.png";

/**
 * Feed preview component
 */
class FeedPreviewComponent extends GenericPreviewComponent{

    /**
     * Displays the item
     */
    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    /**
     * Formats the preview
     * @param item The preview
     * @returns The formatted preview
     */
    doFormatItem(item){
        var icon = item.icon_img;
        var iconImage = <img  className={"icon"} src={redditIcon}alt={item.display_name}/>
        if(icon!=undefined&&icon!="")
            iconImage=<img className={"icon"} src={icon} alt={item.display_name}/>


        return <Card id={"subredditPreview"+this.state.index} sx={{display:"flex", width:"95%", margin:"1em", padding:"1em", cursor:"pointer"}} className={"userPreview"} elevation={4}>
            {iconImage}
            <Typography sx={{padding:"1em"}}>{item.display_name_prefixed}</Typography>
        </Card>;
    }


}
export default FeedPreviewComponent;
