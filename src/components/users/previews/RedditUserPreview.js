import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../utils/GenericPreviewComponent";
import UserPreview from "./UserPreview";
import {Card, Typography} from "@mui/material";
import SocialMediaIconComponent from "../../SocialMediaIconComponent";
class RedditUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.snoovatar_img;
        var img = <img className={"icon"} src={icon} alt={item.name}/>;
        if(icon==undefined){
            img = <SocialMediaIconComponent socialMedia={"reddit"}></SocialMediaIconComponent>
        }

        return <Card  sx={{display:"flex", width:"95%", margin:"1em", padding:"1em", cursor:"pointer"}} className={"userPreview"} elevation={4}>
            {img}
            <Typography sx={{padding:"1em"}}>{item.name}</Typography>
        </Card>;
    }
}
export default RedditUserPreview;
