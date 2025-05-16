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
            <button onClick={this.refresh.bind(this)}>Refrescar</button>
            {this.doFormatPost()}
            {this.formatCommentSection()};
        </section>)
    }

    doFormatPost(){
    }

    formatCommentSection(){
        return <section>
            <CommentSubmitFormComponent replyFunction={this.replyToPost.bind(this)}></CommentSubmitFormComponent>
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
    getPostInfo(){

    }
    getPostID(){

    }
    async refresh(){
        var network = this.getSocialMedia();
        var postID = this.getPostInfo();
        var post = await this.state.postsService.getPostById(network,postID);
        this.state.post = post;
        this.setState(this.state);
    }

    async replyToPost(postContent){
        var post = this.getPostID();
        var network = this.getSocialMedia();
        var result = await this.state.postsService.replyToPost(network,post,postContent);
        await this.refresh();
    }
}
export default ThreadComponent;