import React,{useState, useEffect} from "react";
class FeedComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            following:false
        }
    }

    async follow(){
        var result = await this.doFollow();
    }

    async doFollow(){

    }

    handleFollow(){
        if(this.state.following)
            return <button onClick={this.follow}>Unirse</button>
    }

    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }
    render(){
        return<div>
            <h3>Título de feed</h3>
            {this.handleFollow()}
            <section>
                <h4>Posts</h4>
                {this.formatPosts()}
            </section>
        </div>;
    }

    doFormatPosts(){

    }
}
export default FeedComponent;
