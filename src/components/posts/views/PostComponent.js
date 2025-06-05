import React from "react";
import {Card} from "@mui/material";



class PostComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            post:props.post,
            zoomPost:props.zoomPost,
            parent: props.parent,
            index: props.index,
            getPostInfo: props.getPostInfo,
            id:props.id
        }
    }

    formatPost(){
        return this.doFormatPost();

    }

    displayPost(){

    }

    doFormatPost(){
    }

    render(){
        return (this.formatPost());
    }
}
export default PostComponent;