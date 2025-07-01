import React from "react";
import GenericListComponent from "../../utils/GenericListComponent";
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

    /**
     * Formats the post
     * @param post The post
     * @param i The index
     * @returns The formatted post
     */
    doFormatPost(post, i){

    }
}
export default PostsListComponent;
