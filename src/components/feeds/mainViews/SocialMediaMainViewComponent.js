import React,{useState, useEffect} from "react";
import FeedList from "../feeds/FeedList";
class SocialMediaMainViewComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            postsList:[],
            feedsList:[],
            usersList:[],
            zoomPost: props.zoomPost,
            zoomFeed:props.zoomFeed,
            zoomUser:props.zoomUser,
            searchTerm:"",
            user:"",
            feed:"",
            postsService:props.postsService,
            feedsService:props.feedsService,
            profilesService:props.profilesService,
            toggled:"posts"
        }
        this.tabs={
            feeds:this.formatFeedsTab,
            posts:this.formatPostsTab,
            users:this.formatUsersTab
        }

        this.tabNames=[]
    }

    formatFeedsTab(){
        return <section>
            <div>
                <label>
                    Buscar {this.doFormatFeedName()}
                    <input type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>
                </label>
                <button onClick={this.fetchFeeds.bind(this)}>Buscar por texto</button>

            </div>
            <div>
                {this.formatFeeds()}
            </div>
        </section>
    }

    formatPostsTab(){
        return <section>
            <div>
                <label>
                    Buscar {this.doFormatFeedName()}
                    <input type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>
                </label>
                <label>
                    Usuario a buscar
                    <input type={"text"} onInput={this.handleSearchTermUser.bind(this)}/>
                </label>
                <label>
                    Término a buscar
                    <input type={"text"} onInput={this.handleSearchTerm.bind(this)}/>
                </label>
                <button onClick={this.fetchPosts.bind(this)}>Buscar</button>
            </div>
           <div>
               {this.formatPosts()}
           </div>
        </section>
    }

    formatUsersTab(){
        return <section>
            <div>
                <label>
                    Usuario a buscar
                    <input type={"text"} onInput={this.handleSearchTermUser.bind(this)}/>
                </label>
                <button onClick={this.fetchUsers.bind(this)}>Buscar por texto</button>
            </div>
            <div>
                {this.formatUsers()}
            </div>
        </section>
    }

    getSocialMedia(){

    }

    setToggled(toggled){
        this.state.toggled=toggled;
        this.setState(this.state);
    }

    handleToggle(){
        var toggleFunction = this.tabs[this.state.toggled].bind(this);
        return toggleFunction();
    }
    async fetchPosts(){
        var posts = await this.doFetchPosts();
        this.state.postsList = posts;
        this.setState(this.state);
    }
    async doFetchPosts(){
        var socialMedia = this.getSocialMedia();
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(selectedProfile==[])
            selectedProfile="";
        if(this.state.feed!=undefined && this.state.feed!=""){
            var posts = await this.state.postsService.findPostsInFeed(socialMedia, this.state.feed, this.state.searchTerm, selectedProfile);
            return posts;
        }else if(this.state.searchTerm!=undefined&&this.state.searchTerm!="" ){
            var posts = await this.state.postsService.findPosts(socialMedia, this.state.searchTerm, selectedProfile);
            return posts;
        }else if (this.state.user!=undefined&&this.state.user!=""){
            var posts = await this.state.postsService.findPostsFromUser(socialMedia, this.state.user, this.state.searchTerm, selectedProfile);
            return posts;
        }else{
            var posts = await this.state.postsService.findDefault(socialMedia, selectedProfile);
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
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.feed!=undefined && this.state.feed!=""){
            var posts = await this.state.feedsService.findFeeds(socialMedia, this.state.feed, selectedProfile);
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
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.user!=undefined && this.state.user!=""){
            var posts = await this.state.profilesService.findUsers(socialMedia, this.state.user, selectedProfile);
            return posts;
        }
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
        return <FeedList getList={this.getFeedsList.bind(this)}
                         zoom={this.state.zoomFeed}
                         parent={this}
                         redSocial={this.getSocialMedia()}
        ></FeedList>
    }

    render(){
        return (<section className={"feed"}>
            {this.formatTitle()}
            {this.formatTabButtons()}
            {this.handleToggle()}
        </section>);
    }

    formatTabButtons(){
        return this.tabNames.map((tabName)=>{
            return <button onClick={()=>{this.setToggled(tabName)}}>{tabName}</button>
        })
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

