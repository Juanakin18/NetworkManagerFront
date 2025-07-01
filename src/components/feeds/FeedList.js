import React from "react";
import GenericListComponent from "../utils/GenericListComponent";
import FeedPreviewComponent from "./FeedPreview";

/**
 * Feed list component
 */
class FeedListComponent extends GenericListComponent{

    /**
     * Constructor function
     * @param props The properties
     */
    constructor(props) {
        super(props);
        this.state.redSocial = props.redSocial;
        this.state.feedsService = props.feedsService;
        this.names={
            reddit:"Subreddits",
            bluesky:"Feeds"
        }
    }

    /**
     * Formats the title of the feed list
     * @returns The title
     */
    formatTitle(){
        return <h4>{this.names[this.state.redSocial]}</h4>
    }

    /**
     * Formats the item list
     * @param item The item
     * @param i The index
     * @returns The formatted item
     */
    doFormatItems(item, i){
        return (<FeedPreviewComponent item={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></FeedPreviewComponent>)
    }

    /**
     * Displays an item
     * @param item The item
     */
    doZoom(item){
        this.state.zoom(this.state.redSocial, item.display_name)
    }

}
export default FeedListComponent;