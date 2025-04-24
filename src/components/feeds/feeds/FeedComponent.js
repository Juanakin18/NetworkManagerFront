import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
import BlueskyPostComponent from "../../posts/views/BlueskyPostComponent";
class FeedComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postsList:props.postsList,
            zoomPost: props.zoomPost
        }
    }
    /*
    const postsList = [
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4
        }
    ]*/

     formatPosts(){

        var formatedPosts = this.doFormatPosts();

        return formatedPosts;
    }

    doFormatPosts(){

    }

    formatTitle(){

    }

    render(){
        return (<section className={"feed"}>
            {this.formatTitle()}
            <div>
                {this.formatPosts()}
            </div>
        </section>);
    }
}
export default FeedComponent;

