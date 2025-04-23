import React from "react";



class PostComponent extends React.Component{
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
    constructor(props) {
        super();
        this.state = {
            title:props.post.title,
            text: props.post.content
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

    formatPost(){
        return (<section>
            <h4>{this.state.title}</h4>
            <p>{this.state.content}</p>
            {this.doFormatPost()}
        </section>)
    }

    doFormatPost(){
    }

    render(){
        return (this.formatPost());
    }
}
export default PostComponent;