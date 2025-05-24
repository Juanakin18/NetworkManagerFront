import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../pruebas/GenericPreviewComponent";
import {Card, Typography} from "@mui/material";
class FeedPreviewComponent extends GenericPreviewComponent{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.icon_img;

        return <Card className={"userPreview"}>
            <img src={icon} alt={item.display_name_prefixed}/>
            <Typography>{item.display_name_prefixed}</Typography>
        </Card>;
    }


}
export default FeedPreviewComponent;
