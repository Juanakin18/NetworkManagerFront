import React from "react";



class PostComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            post:props.post,
            zoomPost:props.zoomPost,
            parent: props.parent,
            index: props.index,
            getPostInfo: props.getPostInfo
        }
    }

    formatPost(){
        return (<section className={"post"} onClick={()=>{this.displayPost()}}>
            {this.doFormatPost()}
        </section>)
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