import React,{useState, useEffect} from "react";
import FeedList from "../feeds/FeedList";
class SocialMediaMainViewComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postsList:[],
            zoomPost: props.zoomPost,
            zoomFeed:props.zoomFeed,
            zoomUser:props.zoomUser,
            searchTerm:"",
            user:"",
            feed:"",
            postsService:props.postsService
        }
    }
    getSocialMedia(){

    }
    async fetchPosts(){
        var posts = await this.doFetchPosts();
        this.state.postsList = posts;
        this.setState(this.state);
    }
    async doFetchPosts(){
        var socialMedia = this.getSocialMedia();
        if(this.state.feed!=undefined && this.state.feed!=""){
            var posts = await this.state.postsService.findPostsInFeed(socialMedia, this.state.feed, this.state.searchTerm);
            return posts;
        }else if(this.state.searchTerm!=undefined&&this.state.searchTerm!="" ){
            var posts = await this.state.postsService.findPosts(socialMedia, this.state.searchTerm);
            return posts;
        }else{
            var posts = await this.state.postsService.findDefault(socialMedia);
            return posts;
        }
    }



    async fetchFeeds(){
        var feeds = await this.doFetchFeeds();
        this.state.feedsList = feeds;
        this.setState(this.state);
    }

    async doFetchFeeds() {
        var socialMedia = this.getSocialMedia();
        if(this.state.feed!=undefined && this.state.feed!=""){
            var posts = await this.state.postsService.findFeeds(socialMedia, this.state.feed);
            return posts;
        }
    }



    async fetchUsers(){
        var users = await this.doFetchUsers();
        this.state.usersList = users;
        this.setState(this.state);
    }

    async doFetchUsers() {
        var socialMedia = this.getSocialMedia();
        if(this.state.user!=undefined && this.state.user!=""){
            var posts = await this.state.postsService.findUsers(socialMedia, this.state.user);
            return posts;
        }
    }


    formatSearch(){
        return <section className={"buscar"}>
            <h4>Buscar</h4>
            <div>
                <label>
                    Buscar {this.doFormatFeedName()}
                    <input type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>
                </label>
                <button onClick={this.fetchFeeds.bind(this)}>Buscar por texto</button>
            </div>
            <div>
                <label>
                    Usuario a buscar
                    <input type={"text"} onInput={this.handleSearchTermUser.bind(this)}/>
                </label>
                <button onClick={this.fetchUsers.bind(this)}>Buscar por texto</button>
            </div>
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

    handleSearchTermUser(e){
        this.state.user = e.target.value;
    }
    handleSearchTermFeed(e){
        this.state.feed = e.target.value;
    }

    formatPosts(){
        if(this.state.postsList.length>0){
            var formatedPosts = this.doFormatPosts();
            return <section>
                <h4>Posts buscados</h4>
                {formatedPosts}
            </section>;
        }
    }

    doFormatPosts(){

    }

    formatTitle(){

    }

    formatUsers(){
        if(this.state.usersList.length>0){
            var formatedUsers = this.doFormatUsers();
            return <section>
                <h4>Usuarios buscados</h4>
                {formatedUsers}
            </section>;
        }
    }

    doFormatUsers(){

    }

    formatFeeds(){
        if(this.state.feedsList.length>0){
            var formatedFeeds = this.doFormatFeeds();
            return <section>
                <h4>{this.doFormatFeedName()} buscados</h4>
                {formatedFeeds}
            </section>;
        }
    }

    doFormatFeeds(){
        return <FeedList getFeedsList={this.getFeedsList}
                         zoomFeed={this.state.zoomFeed}
                         parent={this}
                         redSocial={this.getSocialMedia()}
        ></FeedList>
    }

    render(){
        return (<section className={"feed"}>
            {this.formatTitle()}
            {this.formatSearch()}
            <div>
                {this.formatUsers()}
                {this.formatFeeds()}
                {this.formatPosts()}
            </div>
        </section>);
    }

    doFormatFeedName() {

    }
    getPostsList(){
        return this.state.postsList;
    }
    getUsersList(){
        return this.state.usersList;
    }

    getFeedsList(){
        return this.state.feedsList;
    }
}
export default SocialMediaMainViewComponent;

