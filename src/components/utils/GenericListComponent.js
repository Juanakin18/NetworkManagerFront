import React from "react";
import FeedPreview from "../feeds/FeedPreview";
import {Card, Grid, List} from "@mui/material";

class GenericListComponent extends React.Component{

    constructor(props) {
        super(props);
        this.maxHeight = props.maxHeight;
        this.bgColor = props.bgColor;
        if(this.bgColor==undefined)
            this.bgColor="white";
        if(this.maxHeight==undefined)
            this.maxHeight="37em";
        this.state = {
            getList:props.getList,
            zoom: props.zoom,
            parent:props.parent,
            id:props.id
        }
    }
    formatItems(){
        var itemsList = this.state.getList();
        var result = [];
        for (var i =0; i<itemsList.length; i++) {
            var item = itemsList[i];
            var itemComponent = this.doFormatItems(item, i);
            result.push(itemComponent);
        }
        return result;
    }
    render(){
        return <Card className={"postsWithTitle"}>
            <List sx={{
                margin:"1em",
                maxHeight:this.maxHeight,
                overflow:"auto",
                backgroundColor:this.bgColor
            }} container spacing={6}>
                {this.formatItems()}
            </List>

        </Card>;
    }

    formatTitle(){

    }

    zoom(i){
        var feed = this.state.getList()[i];
        this.doZoom(feed);

    }

    doZoom(item){

    }

    getItem(i){
        return this.state.getList()[i];
    }
    doFormatItems(item, i){

    }
}
export default GenericListComponent;