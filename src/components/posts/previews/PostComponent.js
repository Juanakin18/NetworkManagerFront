import React from "react";

/**
 * Post preview component
 */
class PostComponent extends React.Component{

    /**
     * Constructor function
     * @param props The properties
     */
    constructor(props) {
        super();
        this.state = {
            post:props.post,
            zoomPost:props.zoomPost,
            parent: props.parent,
            index: props.index,
            getPostInfo: props.getPostInfo,
            id:props.id,
            isReply: props.isReply
        }
    }

    /**
     * Formats the post
     * @returns The formatted post
     */
    formatPost(){
        return this.doFormatPost();

    }
    /**
     * Displays the post
     */
    displayPost(){

    }
    /**
     * Formats the post
     * @returns The formatted post
     */
    doFormatPost(){
    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return (this.formatPost());
    }
}
export default PostComponent;