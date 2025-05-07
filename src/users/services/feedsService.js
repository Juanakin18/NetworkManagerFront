class FeedsService{

    constructor(repository) {
        this.repository = repository;
        this.followMap = new Map;
    }
    isFollowing(feed, profile){
        var followsProfile = this.followMap[profile.name];
        var followsRed = followsProfile[profile.redSocial];
        if(followsRed==undefined)
            return false;
        return followsRed[feed.name]==undefined;
    }

    getSelectedFeed(){
        return this.selectedFeed;
    }

    follow(profile, feed){
        var result = this.repository.follow(profile, feed);
        this.feedsList = result;
        this.addToFollow(profile, feed);
        return result;
    }

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

    async unfollow(socialMedia, profile, feed){
        var result = await this.repository.unfollow(profile, feed);
        this.feedsList = result;
        this.removeFromFollow(profile, feed);
        return result;
    }



    setSelectedFeed(feed){
        this.selectedFeed=feed;
    }

    async fetchFeedsFromUser(username, redSocial){
        var result = await this.repository.getFeedsFromUser(username, redSocial);
        for(var i =0; i<result.follows; i++)
            this.addToFollow(result.follows[i]);
        this.feedsList = result;
        return result;
    }

    async fetchFeedsFromQuery(query, redSocial){
        var result = await this.repository.getFeedsFromQuery(query, redSocial);
        this.feedsList = result;
        return result;
    }

    getFeeds(){
        return this.feedsList;
    }
}export default FeedsService