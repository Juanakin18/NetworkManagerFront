import React,{useState, useEffect} from "react";
class FeedComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            getFeed:props.feedsService.getSelectedFeed.bind(props.feedsService),
            zoomPost: props.zoomPost,
            postsService:props.postsService,
            feedsService:props.feedsService,
            profilesService: props.profilesService
        }
    }

    async follow(){
        var result = await this.doFollow();
        this.state.following = true;
        this.setState(this.state);
    }

    async unfollow(){
        var result = await this.doUnfollow();
        this.state.following=false;
        this.setState(this.state);
    }

    getSocialMedia(){

    }
    async doFollow(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var feed = this.state.getFeed();
        var result = await this.state.feedsService.follow(profile, this.getSocialMedia(), feed);
        await this.refresh();
    }

    async doUnfollow(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var feed = this.state.getFeed();
        var result = await this.state.feedsService.unfollow(profile, this.getSocialMedia(), feed);
        await this.refresh();
    }


    handleFollow() {
    }

    getFeedID(){

    }

    async refresh(){
        var network = this.getSocialMedia();
        var feed = this.getFeedID();
        var selectedProfile = this.state.profilesService.getSelectedProfile(network);
        var result = await this.state.feedsService.fetchInfoFromFeed(network, feed, selectedProfile);
        this.state.postsService.setPostsFromFeeds(result.posts);
        this.state.feed = result;
        this.setState(this.state);
    }

    isSubscriber(){
        return false;
    }



    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }
    render(){
        return<div>
            {this.parse()}
            {this.handleFollow()}
            <section>
                <h4>Posts</h4>
                {this.formatPosts()}
            </section>
        </div>;
    }

    doFormatPosts(){

    }

    parse(){
        return this.doParse()
    }

    doParse(){

    }

    getPostsFromFeed(){
        var feed = this.state.feedsService.getSelectedFeed();
        var posts = this.state.postsService.getPostsFromFeed(feed);
        return posts;
    }
}
export default FeedComponent;
