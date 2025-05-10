class FeedsService{

    constructor(repository) {
        this.repository = repository;
        this.followMap = new Map;
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

    async findFeeds(socialMedia, feed, profile){
        var result = await this.repository.getFeedsFromQuery(feed, socialMedia, profile, this.feedNames[socialMedia]);
        this.feedsList = result;
        return result;
    }

    async follow(profile, socialMedia, feed){
        var result = await this.repository.follow(profile, socialMedia, feed, this.feedNames[socialMedia]);
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
        var result = await this.repository.unfollow(profile, feed, this.feedNames[socialMedia]);
        this.feedsList = result;
        this.removeFromFollow(profile, feed);
        return result;
    }



    setSelectedFeed(feed){
        this.selectedFeed=feed;
    }

    async fetchFeedsFromUser(username, socialMedia){
        var result = await this.repository.getFeedsFromUser(username, socialMedia, this.feedNames[socialMedia]);
        for(var i =0; i<result.follows; i++)
            this.addToFollow(result.follows[i]);
        this.feedsList = result;
        return result;
    }

    async fetchFeedsFromQuery(query, socialMedia){
        var result = await this.repository.getFeedsFromQuery(query, socialMedia, this.feedNames[socialMedia]);
        this.feedsList = result;
        return result;
    }

    getFeeds(){
        return this.feedsList;
    }

    async fetchInfoFromFeed(socialMedia, feed, selectedProfile){
        var result = await this.repository.fetchInfoFromFeed(socialMedia,feed, selectedProfile, this.feedNames[socialMedia]);
        this.selectedFeed = result.data;
        return result;
    }
}export default FeedsService