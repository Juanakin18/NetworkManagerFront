import React from "react";
class RedditCommentComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            user:props.comment.content,
            text: props.comment.content
        }
    }
    formatPost(){
        return (<section>
            <h4>{this.state.user}</h4>
            <p>{this.state.text}</p>
        </section>)
    }

    render(){
        return (this.formatPost());
    }
}
export default RedditCommentComponent;