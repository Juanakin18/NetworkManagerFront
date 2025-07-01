import React from "react";
import {Card, List} from "@mui/material";

/**
 * Generic list component
 */
class GenericListComponent extends React.Component{

    /**
     * Constructor function
     * @param props The properties
     */
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

    /**
     * Formats the items
     * @returns The list of formatted items
     */
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

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return <Card className={"postsWithTitle"}>
            <List sx={{
                maxHeight:this.maxHeight,
                overflow:"auto",
                backgroundColor:this.bgColor
            }} container spacing={6}>
                {this.formatItems()}
            </List>

        </Card>;
    }

    /**
     * Formats the title of the list
     * @returns The title
     */
    formatTitle(){

    }

    /**
     * Toggles to the detailed view of the item
     * @param i The index of the item
     */
    zoom(i){
        var feed = this.state.getList()[i];
        this.doZoom(feed);

    }
    /**
     * Toggles to the detailed view of the item
     * @param item The item
     */
    doZoom(item){

    }

    /**
     * Returns an item
     * @param i The index of the item
     * @returns The item
     */
    getItem(i){
        return this.state.getList()[i];
    }

    /**
     * Formats the items
     * @param item The item
     * @param i The index of the item
     * @returns The formatted items
     */
    doFormatItems(item, i){

    }
}
export default GenericListComponent;