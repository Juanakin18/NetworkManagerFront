import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../pruebas/GenericPreviewComponent";
import {Box, Card, Typography} from "@mui/material";
import redditIcon from "../../../media/icons/reddit.png";
class FeedPreviewComponent extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.icon_img;
        var iconImage = <img  className={"icon"} src={redditIcon}alt={item.display_name}/>
        if(icon!=undefined&&icon!="")
            iconImage=<img className={"icon"} src={icon} alt={item.display_name}/>


        return <Card id={"subredditPreview"+this.state.index} sx={{display:"flex", width:"95%", margin:"1em", padding:"1em"}} className={"userPreview"} elevation={4}>
            {iconImage}
            <Typography sx={{padding:"1em"}}>{item.display_name_prefixed}</Typography>
        </Card>;
    }


}
export default FeedPreviewComponent;
