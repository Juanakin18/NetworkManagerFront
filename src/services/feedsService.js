/**
 * Feeds service
 */
class FeedsService{

    /**
     * Constructor function
     * @param repository The feeds repository
     * @param profilesService The profiles service
     */
    constructor(repository, profilesService) {
        this.repository = repository;
        this.followMap = new Map;
        this.profilesService = profilesService;
        this.socialMedia="";
        this.searchFunctions={
            bluesky: this.repository.getFeedsFromQuery,
            reddit:this.repository.getFeedsFromQuery
        }
        this.feedsList=[];
        this.feedNames = {
            reddit:"subreddits",
            bluesky:"feeds"
        };
    }

    /**
     * Returns the selected feed
     * @returns The selected feed
     */
    getSelectedFeed(){
        return this.selectedFeed;
    }

    /**
     * Finds a list of feeds by text
     * @param socialMedia The social network
     * @param feed The text
     * @param profile The selected profile
     * @returns The list of feeds
     */
    async findFeeds(socialMedia, feed, profile){
        var result = await this.repository.getFeedsFromQuery(feed, socialMedia, profile, this.feedNames[socialMedia]);
        this.feedsList = result;
        return result;
    }

    /**
     * Subscribes a user to a feed
     * @param profile The selected profile
     * @param socialMedia The social network
     * @param feed The feed
     * @returns The result
     */
    async follow(profile, socialMedia, feed){
        var nombre = this.feedNames[socialMedia];
        var result = await this.repository.follow(profile, socialMedia, feed, nombre);
        this.feedsList = result;
        this.addToFollow(profile, feed);
        return result;
    }

    /**
     * Adds information to the follow map
     * @param profile The profile
     * @param feed The feed
     */
    addToFollow(profile, feed){
        var followsRed = this.followMap[profile.redSocial];
        if (followsRed == undefined){
            followsRed = new Map();
        }
        var followsProfile = followsRed[profile.name];
        if(followsProfile==undefined)
            followsProfile = [];
        if(!followsProfile.includes(feed.name))
            followsProfile.push(feed.name);

        this.followMap[profile.redSocial]=followsRed;
    }

    /**
     * Adds information from the follow map
     * @param profile The profile
     * @param feed The feed
     */

    removeFromFollow(profile, feed){
        var followsRed = this.followMap[profile.redSocial];
        if (followsRed == undefined){
            followsRed = new Map();
        }
        var followsProfile = followsRed[profile.name];
        if(followsProfile==undefined)
            followsProfile = [];
        followsProfile=followsProfile.filter((feedName)=>feedName!=feed.name)
        followsRed[profile.name]=followsProfile;
        this.followMap[profile.redSocial]=followsRed;
    }

    /**
     * Unsubscribes a user from a feed
     * @param profile The selected profile
     * @param socialMedia The social network
     * @param feed The feed
     * @returns The result
     */
    async unfollow(profile, socialMedia, feed){
        var nombre = this.feedNames[socialMedia];
        var result = await this.repository.unfollow(profile, socialMedia, feed, nombre);
        this.feedsList = result;
        this.removeFromFollow(profile, feed);
        return result;
    }

    /**
     * Sets the selected feed
     * @param feed The feed
     */
    setSelectedFeed(feed){
        this.selectedFeed=feed;
    }

    /**
     * Fetches the feeds from a user
     * @param username The user
     * @param socialMedia The social network
     * @returns The feeds
     */
    async fetchFeedsFromUser(username, socialMedia){
        var result = await this.repository.getFeedsFromUser(username, socialMedia, this.feedNames[socialMedia]);
        for(var i =0; i<result.follows; i++)
            this.addToFollow(result.follows[i]);
        this.feedsList = result;
        return result;
    }
    /**
     * Fetches the feeds by text
     * @param query The text
     * @param socialMedia The social network
     * @returns The feeds
     */
    async fetchFeedsFromQuery(query, socialMedia){
        var result = await this.repository.getFeedsFromQuery(query, socialMedia, this.feedNames[socialMedia]);
        this.feedsList = result;
        return result;
    }

    /**
     * Returns the feeds list
     * @returns The feeds list
     */
    getFeeds(){
        return this.feedsList;
    }

    /**
     * Refreshes the information
     */
    async refresh(){
        var profile = this.profilesService.getSelectedProfile(this.socialMedia);
        var selected = this.selectedFeed.display_name;
        if(profile!="" && profile!=undefined)
            await this.fetchInfoFromFeed(this.socialMedia, selected);
    }

    /**
     * Gets the information from a feed
     * @param socialMedia The social network
     * @param feed The feed
     * @param selectedProfile The selected profile
     * @returns The information
     */
    async fetchInfoFromFeed(socialMedia, feed, selectedProfile){
        this.socialMedia=socialMedia;
        var selectedProfile= this.profilesService.getSelectedProfile(socialMedia);
        var result = await this.repository.fetchInfoFromFeed(socialMedia,feed, selectedProfile, this.feedNames[socialMedia]);
        this.selectedFeed = result.data;
        return result;
    }
}export default FeedsService