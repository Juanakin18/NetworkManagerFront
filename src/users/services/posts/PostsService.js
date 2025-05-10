import profilesService from "../ProfilesService";

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
                user:this.postsRepository.findFromUserBluesky
            },
            reddit: {
                feed:this.postsRepository.findInSubreddit,
                posts:this.postsRepository.findPostsReddit,
                default:this.postsRepository.findDefaultReddit,
                user:this.postsRepository.findFromUserReddit
            }
        }
        this.selectedPost = {}
    }

    async postMultiple(postInfo, media, perfiles){
        for (const perfil in perfiles) {
            await this.post(postInfo, media, perfiles[perfil]);
        }
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

    async repost(post){
        await this.postsRepository.repost(post, this.profilesService.getSelectedProfile("bluesky"));
    }

    async vote(post, score){
        await this.postsRepository.upvote(post, this.profilesService.getSelectedProfile("reddit"), score);
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
}
export default PostsService;