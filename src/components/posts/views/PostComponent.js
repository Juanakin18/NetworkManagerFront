import React from "react";



class PostComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            post:props.post,
            zoomPost:props.zoomPost
        }
    }

    formatPost(){
        return (<section className={"post"}>
            <h4 onClick={()=>{this.displayPost()}}>{this.state.post.title}</h4>
            <p>{this.state.post.content}</p>
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