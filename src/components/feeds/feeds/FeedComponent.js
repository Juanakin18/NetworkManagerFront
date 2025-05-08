import React,{useState, useEffect} from "react";
class FeedComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            getFeed:props.feedsService.getSelectedFeed,
            following:props.feedsService.isFollowing(),
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
        var result = await this.state.feedsService.follow(this.getSocialMedia(), profile, feed);
    }

    async doUnfollow(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var feed = this.state.getFeed();
        var result = await this.state.feedsService.unfollow(this.getSocialMedia(), profile, feed);

    }

    handleFollow(){
        if(this.state.getFeed().following)
            return <button onClick={this.follow}>Unirse</button>
        else
            return <button onClick={this.unfollow}>Irse</button>
    }

    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }
    render(){
        return<div>
            {this.handleTitle()}
            {this.handleFollow()}
            <section>
                <h4>Posts</h4>
                {this.formatPosts()}
            </section>
        </div>;
    }

    doFormatPosts(){

    }

    handleTitle(){
        return <h4>{this.doHandleTitle()}</h4>
    }

    doHandleTitle(){

    }

    getPostsFromFeed(){
        var feed = this.state.feedsService.getSelectedFeed();
        var posts = this.state.postsService.getPostsFromFeed(feed);
        return posts;
    }
}
export default FeedComponent;
