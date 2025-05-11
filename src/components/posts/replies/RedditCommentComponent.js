import React from "react";
class RedditCommentComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            comment:props.comment,
            zoomUser:props.zoomUser
        }
    }
    formatPost(){
        return (<section>
            <h4 onClick={()=>this.zoomToUser("reddit",this.state.comment.author)}>Autor:{this.state.comment.author}</h4>
            <p>{this.state.comment.body}</p>
        </section>)
    }

    render(){
        return (this.formatPost());
    }

    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }
}
export default RedditCommentComponent;