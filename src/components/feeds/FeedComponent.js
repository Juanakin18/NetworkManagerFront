import React from "react";
import {Card} from "@mui/material";

/**
 * Generic feed component
 */
class FeedComponent extends React.Component{

    /**
     * Constructor
     * @param props Properties
     */
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

    /**
     * Subscribes to the feed
     */
    async follow(){
        var result = await this.doFollow();
        this.state.following = true;
        this.setState(this.state);
    }

    /**
     * Unsubscribes from a feed
     */
    async unfollow(){
        var result = await this.doUnfollow();
        this.state.following=false;
        this.setState(this.state);
    }

    /**
     * Returns the social media
     */
    getSocialMedia(){

    }

    /**
     * Subscribes to the feed
     */
    async doFollow(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var feed = this.state.getFeed();
        var result = await this.state.feedsService.follow(profile, this.getSocialMedia(), feed);
        await this.refresh();
    }
    /**
     * Unsubscribes from a feed
     */
    async doUnfollow(){
        var profile = this.state.profilesService.getSelectedProfile(this.getSocialMedia());
        var feed = this.state.getFeed();
        var result = await this.state.feedsService.unfollow(profile, this.getSocialMedia(), feed);
        await this.refresh();
    }

    /**
     * Handles the follow buttons
     */
    handleFollow() {
    }

    /**
     * Returns the feed id
     */
    getFeedID(){

    }

    /**
     * Refreshes the component
     */
    async refresh(){
        var network = this.getSocialMedia();
        var feed = this.getFeedID();
        var selectedProfile = this.state.profilesService.getSelectedProfile(network);
        var result = await this.state.feedsService.fetchInfoFromFeed(network, feed, selectedProfile);
        this.state.postsService.setPostsFromFeeds(result.posts);
        this.state.feed = result;
        this.setState(this.state);
    }

    /**
     * Returns if the profile is subscribed or not
     * @returns If the profile is subscribed or not
     */
    isSubscriber(){
        return false;
    }

    /**
     * Formats the posts
     * @returns The posts
     */
    formatPosts(){
        var result = this.doFormatPosts();
        return result;
    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return<Card  sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} >

            {this.parse()}
            <Card sx={{backgroundColor:"grey.medium"}}>
                {this.formatPosts()}
            </Card>
        </Card>;
    }
    /**
     * Formats the posts
     */
    doFormatPosts(){

    }

    /**
     * Parses the feed information
     * @returns The parsed information
     */
    parse(){
        return this.doParse()
    }

    /**
     * Parses the information
     */
    doParse(){

    }

    /**
     * Returns the posts from this feed
     * @returns The posts
     */
    getPostsFromFeed(){
        var feed = this.state.feedsService.getSelectedFeed();
        var posts = this.state.postsService.getPostsFromFeed(feed);
        return posts;
    }
}
export default FeedComponent;
