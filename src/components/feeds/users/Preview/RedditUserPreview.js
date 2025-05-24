import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../../pruebas/GenericPreviewComponent";
import UserPreview from "./UserPreview";
import {Card, Typography} from "@mui/material";
class RedditUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.snoovatar_img;

        return <Card  sx={{display:"flex", width:"100%", margin:"1em"}} className={"userPreview"}>
            <img className={"icon"} src={icon} alt={item.name}/>
            <Typography>{item.name}</Typography>
        </Card>;
    }
}
export default RedditUserPreview;
