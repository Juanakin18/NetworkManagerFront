import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import FeedPreview from "./FeedPreview";
import GenericListComponent from "../../pruebas/GenericListComponent";
class FeedListComponent extends GenericListComponent{

    constructor(props) {
        super(props);
        this.state.redSocial = props.redSocial;
    }
    formatTitle(){
        return <h4>Feeds</h4>
    }
    doFormatItems(item, i){
        return (<FeedPreview feed={item}
                             getFeed={this.getItem}
                             zoomFeed={this.zoom}
                             parent={this}
                             index={i}
        ></FeedPreview>)
    }
    doZoom(item){
        this.state.zoom(this.state.redSocial, item)
    }

}
export default FeedListComponent;