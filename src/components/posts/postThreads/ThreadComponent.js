import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";

class ThreadComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            postsService: props.postsService,
            zoomUser: props.zoomUser,
            zoomPost:props.zoomPost
        }
    }


    formatPost(){
        return (<section className={"post"}>
            {this.doFormatPost()}
            {this.formatCommentSection()};
        </section>)
    }

    doFormatPost(){
    }

    formatCommentSection(){
        return <section>
            <CommentSubmitFormComponent></CommentSubmitFormComponent>
            <section>
                {this.formatCommentsList()}
            </section>

        </section>
    }

    formatCommentsList(){
       return this.doFormatCommentsList();
    }
    doFormatCommentsList(){

    }

    render(){
        return (this.formatPost());
    }

    zoomToUser(socialMedia, user){
        this.state.zoomUser(socialMedia, user)
    }
    getSocialMedia(){

    }
    getPostID(){

    }
    async refresh(){
        var network = this.getSocialMedia();
        var postID = this.getPostID();
        var post = await this.state.postsService.getPostById(network,postID);
        this.state.post = post;
        this.setState(this.state);
    }
}
export default ThreadComponent;