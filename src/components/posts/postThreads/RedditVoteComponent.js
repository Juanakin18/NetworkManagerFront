import React from "react";

class RedditVoteComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            getPost:props.getPost,
            upvote:props.upvote,
            downvote: props.downvote,
            unvote:props.unvote
        }
    }
    render() {
        return this.printVotingSection();
    }

    printVotingSection(){
        var post = this.state.getPost();
        var likes = post.likes;
        if(likes==undefined || likes==null)
            return <section>

                <button onClick={this.state.upvote}>Upvote</button>
                <p>{post.score}</p>
                <button onClick={this.state.downvote}>Downvote</button>
            </section>
        else if(likes){
            return <section>
                <button onClick={this.state.unvote}>Quitar upvote</button>
                <p>{post.score}</p>
                <button onClick={this.state.downvote}>Downvote</button>
            </section>
        }else
            return <section>
                <button onClick={this.state.upvote}>Upvote</button>
                <p>{post.score}</p>
                <button onClick={this.state.unvote}>Quitar Downvote</button>
            </section>
    }
} export default RedditVoteComponent