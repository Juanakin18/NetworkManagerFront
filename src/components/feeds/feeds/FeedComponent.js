import React,{useState, useEffect} from "react";
class FeedComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postsList:[],
            zoomPost: props.zoomPost,
            searchTerm:"",
            postsService:props.postsService
        }
    }

    async fetchPosts(){
        var posts = await this.doFetchPosts();
        this.state.postsList = posts;
        this.setState(this.state);
    }

    formatSearch(){
        return <section className={"buscar"}>
            <h4>Buscar</h4>
            {this.doFormatSearch()}
            <div>
                <label>
                    Término a buscar
                    <input type={"text"} onInput={this.handleSearchTerm.bind(this)}/>
                </label>
                <button onClick={this.fetchPosts.bind(this)}>Buscar por texto</button>
            </div>
        </section>
    }

    handleSearchTerm(e){
        this.state.searchTerm = e.target.value;
    }

    formatPosts(){
        var formatedPosts = this.doFormatPosts();
        return formatedPosts;
    }

    async doFetchPosts(){

    }

    doFormatPosts(){

    }

    formatTitle(){

    }

    doFormatSearch(){

    }

    render(){
        return (<section className={"feed"}>
            {this.formatTitle()}
            {this.formatSearch()}
            <div>
                {this.formatPosts()}
            </div>
        </section>);
    }
}
export default FeedComponent;

