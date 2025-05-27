import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../pruebas/GenericPreviewComponent";
import {Card, Typography} from "@mui/material";
class FeedPreviewComponent extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.icon_img;


        return <Card  sx={{display:"flex", width:"95%", margin:"1em", padding:"1em"}} className={"userPreview"} elevation={4}>
            <img className={"icon"} src={icon} alt={item.display_name_prefixed}/>
            <Typography sx={{padding:"1em"}}>{item.display_name_prefixed}</Typography>
        </Card>;
    }


}
export default FeedPreviewComponent;
