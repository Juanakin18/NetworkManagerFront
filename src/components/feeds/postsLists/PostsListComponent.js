import React,{useState, useEffect} from "react";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import GenericListComponent from "../../pruebas/GenericListComponent";
import FeedPreview from "../feeds/FeedPreview";
class PostsListComponent extends GenericListComponent{

    formatTitle(){
        return <h4>Posts</h4>
    }
    doFormatItems(item, i){
        return this.doFormatPost(item, i);
    }
    doZoom(item){
        this.state.zoom(this.state.redSocial, item)
    }
    doFormatPost(post, i){

    }
}
export default PostsListComponent;
