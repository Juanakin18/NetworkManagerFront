/**
 * Posts service
 */
class PostsService{

    /**
     * Constructor
     * @param profilesService The profiles service
     * @param postsRepository The posts repository
     * @param usersService The users service
     */
    constructor(profilesService, postsRepository, usersService) {
        this.profilesService = profilesService;
        this.postsRepository = postsRepository;
        this.socialMedia="";
        this.posts={
            reddit:[],
            bluesky:[]
        }
        this.postsFromFeeds = {};
        this.postsFromUsers = {};
        this.postsSearchFunctions={
            bluesky: {
                feed:this.postsRepository.findInFeedBluesky,
                posts:this.postsRepository.findPostsBluesky,
                default:this.postsRepository.findDefaultBluesky,
                user:this.postsRepository.findFromUserBluesky,
                id:this.postsRepository.getPostByIdBluesky
            },
            reddit: {
                feed:this.postsRepository.findInSubreddit,
                posts:this.postsRepository.findPostsReddit,
                default:this.postsRepository.findDefaultReddit,
                user:this.postsRepository.findFromUserReddit,
                id:this.postsRepository.getPostByIdReddit
            }
        }
        this.selectedPost = {}

        this.formatLinkFunctions={
            reddit:this.formatLinkReddit,
            bluesky:this.formatLinkBluesky
        }
    }

    /**
     * Uploads a post in multiple profiles
     * @param postInfo The post
     * @param media The embedded media
     * @param profiles The profiles
     * @returns The result and errors
     */
    async postMultiple(postInfo, media, profiles){
        if(profiles.length==0){
            return {
                result:"ERROR",
                errors:{
                    users:[
                        "Tienes que seleccionar algún perfil para postear"
                    ]
                }
            }
        }
        var errorList = this.checkProfiles(postInfo, profiles);
        if(errorList.errorsNumber>0){
            return {
                result:"ERROR",
                errors:errorList.errors
            }
        }

        for (const profile in profiles) {
            await this.post(postInfo, media, profiles[profile]);
        }
        return {result:"SUCCESS"}
    }

    /**
     * Checks the profiles selection
     * @param postInfo The post
     * @param profiles The profiles
     * @returns The errors
     */
    checkProfiles(postInfo, profiles){
        var errors = {
            title:[],
            subreddit:[]
        };
        var errorsNumber = 0;
        var redditProfiles = profiles.filter((profile)=>profile.socialMedia=="reddit");
        var hasReddit = !redditProfiles.length==0;
        if(hasReddit){
            if(postInfo.title=="" || postInfo.title==undefined){
                errorsNumber++;
                errors.title.push("El título no puede estar en blanco si quieres subirlo a reddit");
            }
            if(postInfo.subreddit=="" || postInfo.subreddit==undefined){
                errorsNumber++;
                errors.title.push("El subreddit no puede estar en blanco si quieres subirlo a reddit");
            }
        }
        return {
            errors:errors,
            errorsNumber:errorsNumber
        }
    }

    /**
     * Shares a post in multiple profiles
     * @param postInfo The information
     * @param profiles The profiles list
     * @returns The result
     */
    async shareMultiple(postInfo, profiles){
        var postToShare = postInfo.postToShare;
        var socialMedia=postInfo.socialMedia;
        var subreddit=postInfo.subreddit;
        var postContent=postInfo.postContent;
        var title=postInfo.title;

        var post = this.formatPost(postToShare, socialMedia, subreddit,postContent,title);
        var resultCode = "SUCCESS";
        var errors = {};
        for (const profile in profiles) {
            var result = await this.post(post, undefined, profiles[profile]);
            if(result.result!="SUCCESS")
                resultCode="FAILIURE";
        }
        return {result:resultCode,
        errors:errors}
    }

    /**
     * Formats a post to share it
     * @param postToShare The post
     * @param socialMedia The social network
     * @param subreddit The subreddit
     * @param postContent The post content
     * @param title The title
     * @returns The formatted post
     */
    formatPost(postToShare, socialMedia, subreddit, postContent, title){
        var link = this.formatLinkFunctions[socialMedia](postToShare);
        var postText = postContent+" "+link;
        return {
            postContent:postText,
            subreddit:subreddit,
            title:title
        }
    }
    /**
     * Formats a link to a reddit post
     * @param post The post
     * @returns The link
     */
    formatLinkReddit(post){
        return "https://www.reddit.com"+post.permalink;
    }

    /**
     * Formats a link to a bluesky post
     * @param post The post
     * @returns The link
     */
    formatLinkBluesky(post){
        var author = post.author.handle;
        var uri = post.uri;
        var id = uri.split("/")[4];
        return "https://bsky.app/profile/"+author+"/post/"+id;
    }


    /**
     * Uploads a post
     * @param postInfo The post info
     * @param media The embedded media
     * @param profile The profile
     * @returns If it has been a success or not
     */
    async post(postInfo, media, profile){
        var result = await this.postsRepository.post(postInfo, media, profile);
        if(result.status=="SUCCESS")
            return {
                result:"SUCCESS"
            }
        else
            return {
                result:"ERROR"
            }
    }
    /**
     * Finds posts by feed
     * @param socialMedia The social network
     * @param feed The feed
     * @param profile The profile
     * @returns The list of posts
     */
    async findPostsInFeed(socialMedia, feed, profile){
        var func = this.postsSearchFunctions[socialMedia].feed;
        var result = await func(feed, profile);
        this.postsFromFeeds = result;
        this.posts[socialMedia] = result;
        return result;
    }
    /**
     * Finds posts by user
     * @param socialMedia The social network
     * @param user The user
     * @param profile The profile
     * @returns The list of posts
     */
    async findPostsFromUser(socialMedia, user, profile){
        var func = this.postsSearchFunctions[socialMedia].user;
        var result = await func(user, profile);
        this.postsFromUsers = result;
        this.posts[socialMedia] = result;
        return result;
    }

    /**
     * Finds posts by text
     * @param socialMedia The social network
     * @param searchTerm The text
     * @param profile The profile
     * @returns The list of posts
     */
    async findPosts(socialMedia, searchTerm, profile){
        var func = this.postsSearchFunctions[socialMedia].posts;
        var result = await func(searchTerm, profile);
        this.posts[socialMedia] = result;
        return result;
    }

    /**
     * Finds the default posts
     * @param socialMedia The social network
     * @param profile The profile
     * @returns The default posts list
     */
    async findDefault(socialMedia, profile){
        var func = this.postsSearchFunctions[socialMedia].default;
        var result = await func(profile);
        this.posts[socialMedia] = result;
        return result;
    }
    /**
     * Gets posts from a feed
     * @param feed The feed
     * @returns The list of posts
     */
    getPostsFromFeed(feed){
        return this.postsFromFeeds;
    }

    /**
     * Gets posts from a user
     * @param profile The user
     * @returns The list of posts
     */
    getPostsFromUser(profile){
        return this.postsFromUsers;
    }
    /**
     * Likes a post
     * @param post The post
     */
    async like(post){
        await this.postsRepository.like(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    /**
     * Unlikes a post
     * @param post The post
     */
    async unlike(post){
        await this.postsRepository.unlike(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    /**
     * Reposts a post
     * @param post The post
     */
    async repost(post){
        await this.postsRepository.repost(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    /**
     * Votes a post
     * @param post The post
     * @param score The score
     */
    async vote(post, score){
        await this.postsRepository.vote(post, this.profilesService.getSelectedProfile("reddit"), score);
    }

    /**
     * Sets the posts from feeds
     * @param posts The new posts
     */
    setPostsFromFeeds(posts){
        this.postsFromFeeds = posts;
        this.posts = posts;
    }

    /**
     * Returns the selected post
     * @returns The selected post
     */
    getSelectedPost(){
        return this.selectedPost;
    }

    /**
     * Selects a post
     * @param post The post
     */
    setSelectedPost(post){
        this.selectedPost = post;
    }

    /**
     * Gets the posts list
     * @param socialMedia The social network
     * @returns The posts list
     */
    getPosts(socialMedia){
        return this.posts[socialMedia];
    }

    /**
     * Refreshes the information
     */
    async refresh(){
        await this.getPostById(this.socialMedia, this.selectedPost)
    }

    /**
     * Gets all the information of a post
     * @param socialMedia The social network
     * @param post The post
     * @param profile The profile
     * @returns The information
     */
    async getPostById(socialMedia, post, profile){
        this.socialMedia=socialMedia;
        var selectedProfile= this.profilesService.getSelectedProfile(socialMedia);
        var func = this.postsSearchFunctions[socialMedia].id;
        var result = await func(post, selectedProfile);
        this.selectedPost = result;
        return result;
    }

    /**
     * Replies to a post
     * @param socialMedia The social network
     * @param post The post
     * @param postContent The reply
     * @returns {Promise<*>}
     */
    async replyToPost(socialMedia, post, postContent){
        var selectedProfile= this.profilesService.getSelectedProfile(socialMedia);
        var result = this.postsRepository.reply(post, selectedProfile, postContent, socialMedia);
        return result;
    }

    /**
     * Replies to a comment
     * @param socialMedia The social network
     * @param comment The comment
     * @param reply The reply
     * @returns The result
     */
    async replyToComment(socialMedia, comment, reply){
        var selectedProfile= this.profilesService.getSelectedProfile(socialMedia);
        var result = this.postsRepository.replyToComment(reply, selectedProfile, comment, socialMedia);
        return result;
    }

    /**
     * Votes a comment
     * @param socialMedia
     * @param comment
     * @param score
     * @returns The result
     */
    async voteComment(socialMedia, comment, score){
        var selectedProfile= this.profilesService.getSelectedProfile(socialMedia);
        var result = this.postsRepository.voteComment(score, selectedProfile, comment, socialMedia);
        return result;
    }

    /**
     * Gets a comment
     * @param index The array of indexes
     * @returns The comment
     */
    getComment(index){
        index=index.map((x)=>x);
        var post = this.getSelectedPost();
        var info = post.comments;
        var comment = undefined;
        while(index.length>0){
            var index0 = index.shift();
            comment = info[index0];
            if(comment!=undefined){
                var info2 = comment.replies.data;
                if(info2!=undefined){
                    info2 = info2.children;
                    info = info2.map((comment)=>comment.data);
                }
            }
        }
        return comment;

    }
}
export default PostsService;