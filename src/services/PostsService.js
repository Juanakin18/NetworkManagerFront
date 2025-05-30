import profilesService from "./ProfilesService";

class PostsService{


    constructor(profilesService, postsRepository, usersService) {
        this.profilesService = profilesService;
        this.postsRepository = postsRepository;
        this.usersService = usersService;
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

    async postMultiple(postInfo, media, perfiles){
        for (const perfil in perfiles) {
            await this.post(postInfo, media, perfiles[perfil]);
        }
    }

    async shareMultiple(postInfo, perfiles){
        var postToShare = postInfo.postToShare;
        var socialMedia=postInfo.socialMedia;
        var subreddit=postInfo.subreddit;
        var postContent=postInfo.postContent;
        var title=postInfo.title;

        var post = this.formatPost(postToShare, socialMedia, subreddit,postContent,title);
        for (const perfil in perfiles) {
            await this.post(post, undefined, perfiles[perfil]);
        }
    }

    formatPost(postToShare, socialMedia, subreddit, postContent, title){
        var link = this.formatLinkFunctions[socialMedia](postToShare);
        var postText = postContent+" "+link;
        return {
            postContent:postText,
            subreddit:subreddit,
            title:title
        }
    }

    formatLinkReddit(post){
        return "https://www.reddit.com"+post.permalink;
    }

    formatLinkBluesky(post){
        var author = post.author.handle;
        var uri = post.uri;
        var id = uri.split("/")[4];
        return "https://bsky.app/profile/"+author+"/post/"+id;
    }



    async post(postInfo, media, perfil){
        var result = this.postsRepository.post(postInfo, media, perfil);
        if(result.result=="SUCCESS")
            return {
                result:"SUCCESS"
            }
        else
            return {
                result:"FAILIURE"
            }
    }

    async findPostsInFeed(redSocial, feed, searchTerm, profile){
        var func = this.postsSearchFunctions[redSocial].feed;
        var result = await func(feed, searchTerm, profile);
        this.postsFromFeeds = result;
        this.posts = result;
        return result;
    }

    async findPostsFromUser(redSocial, user, searchTerm, profile){
        var func = this.postsSearchFunctions[redSocial].user;
        var result = await func(user, searchTerm, profile);
        this.postsFromUsers = result;
        this.posts = result;
        return result;
    }

    async findPosts(redSocial, searchTerm, profile){
        var func = this.postsSearchFunctions[redSocial].posts;
        var result = await func(searchTerm, profile);
        this.posts = result;
        return result;
    }

    async findDefault(redSocial, profile){
        var func = this.postsSearchFunctions[redSocial].default;
        var result = await func(profile);
        this.posts = result;
        return result;
    }

    getPostsFromFeed(feed){
        return this.postsFromFeeds;
    }

    getPostsFromUser(profile){
        return this.postsFromUsers;
    }

    async like(post){
        await this.postsRepository.like(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    async unlike(post){
        await this.postsRepository.unlike(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    async repost(post){
        await this.postsRepository.repost(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    async vote(post, score){
        await this.postsRepository.vote(post, this.profilesService.getSelectedProfile("reddit"), score);
    }

    setPostsFromFeeds(posts){
        this.postsFromFeeds = posts;
        this.posts = posts;
    }

    getSelectedPost(){
        return this.selectedPost;
    }

    setSelectedPost(post){
        this.selectedPost = post;
    }

    getPosts(){
        return this.posts;
    }
    async getPostById(redSocial, post, profile){
        var selectedProfile= this.profilesService.getSelectedProfile(redSocial);
        var func = this.postsSearchFunctions[redSocial].id;
        var result = await func(post, selectedProfile);
        this.selectedPost = result;
        return result;
    }

    async replyToPost(redSocial, post, postContent){
        var selectedProfile= this.profilesService.getSelectedProfile(redSocial);
        var result = this.postsRepository.reply(post, selectedProfile, postContent, redSocial);
        return result;
    }

    async replyToComment(redSocial, comment, reply){
        var selectedProfile= this.profilesService.getSelectedProfile(redSocial);
        var result = this.postsRepository.replyToComment(reply, selectedProfile, comment, redSocial);
        return result;
    }

    async voteComment(redSocial, comment, score){
        var selectedProfile= this.profilesService.getSelectedProfile(redSocial);
        var result = this.postsRepository.voteComment(score, selectedProfile, comment, redSocial);
        return result;
    }
}
export default PostsService;