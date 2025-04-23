import React,{useState, useEffect} from "react";

import {Autocomplete, Box, Card, TextField} from "@mui/material";
class FeedComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            postsList:props.postsList
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
        this.state.postsList.map((post)=>{
            return <BlueskyPostComponent post={post}></BlueskyPostComponent>
        })
    }

    render(){
        return (<section className={"feed"}>
            {this.formatPosts()}
        </section>);
    }
}
export default FeedComponent;

