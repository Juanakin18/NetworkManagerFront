import React,{useState, useEffect} from "react";
import GenericPreviewComponent from "../../../pruebas/GenericPreviewComponent";
import UserPreview from "./UserPreview";
import {Card, Stack, Typography} from "@mui/material";
class BlueskyUserPreview extends UserPreview{

    doDisplayItem(){
        this.state.zoom(this.state.index);
    }

    doFormatItem(item){
        var icon = item.avatar;

        return <Card sx={{display:"flex", width:"95%", margin:"1em" , cursor:"pointer"}} className={"userPreview"} elevation={4}>
            <img className={"icon"} src={icon} alt={item.handle}/>
            <Stack>
                <Typography>{item.displayName}</Typography>
                <Typography>{item.handle}</Typography>
            </Stack>

        </Card>;
    }
}
export default BlueskyUserPreview;
