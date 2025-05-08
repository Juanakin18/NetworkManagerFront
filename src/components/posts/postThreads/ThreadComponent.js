import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";

class ThreadComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            postsService: props.postsService
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
                {/*this.formatCommentsList()*/}
            </section>

        </section>
    }

    formatCommentsList(){
        var result = this.state.post.repliesList.map((comment)=>{
            return this.doFormatComment(comment);
        })
        return result;
    }
    doFormatComment(comment){

    }

    render(){
        return (this.formatPost());
    }
}
export default ThreadComponent;