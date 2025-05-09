import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
import FeedPreview from "./FeedPreview";
import GenericListComponent from "../../pruebas/GenericListComponent";
import FeedPreviewComponent from "./FeedPreview";
class FeedListComponent extends GenericListComponent{

    constructor(props) {
        super(props);
        this.state.redSocial = props.redSocial;
        this.state.feedsService = props.feedsService;
        this.names={
            reddit:"Subreddits",
            bluesky:"Feeds"
        }
    }
    formatTitle(){
        return <h4>{this.names[this.state.redSocial]}</h4>
    }
    doFormatItems(item, i){
        return (<FeedPreviewComponent item={item}
                             getItem={this.getItem.bind(this)}
                             zoom={this.zoom.bind(this)}
                             parent={this}
                             index={i}
        ></FeedPreviewComponent>)
    }
    doZoom(item){
        this.state.zoom(this.state.redSocial, item)
    }

}
export default FeedListComponent;