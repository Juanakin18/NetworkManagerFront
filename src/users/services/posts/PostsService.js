class PostsService{


    constructor(profilesService, postsRepository, usersService) {
        this.profilesService = profilesService;
        this.postsRepository = postsRepository;
        this.usersService = usersService;
        this.postsSearchFunctions={
            bluesky: {
                feed:this.postsRepository.findInFeedBluesky,
                posts:this.postsRepository.findPostsBluesky,
                default:this.postsRepository.findDefaultBluesky
            },
            reddit: {
                feed:this.postsRepository.findInSubreddit,
                posts:this.postsRepository.findPostsReddit,
                default:this.postsRepository.findDefaultReddit
            }
        }
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

    async findPostsInFeed(redSocial, feed, searchTerm){
        var func = this.postsSearchFunctions[redSocial].feed;
        var result = await func(feed, searchTerm);
        return result;
    }

    async findPosts(redSocial, searchTerm){
        var func = this.postsSearchFunctions[redSocial].posts;
        var result = await func(searchTerm);
        return result;
    }

    async findDefault(redSocial){
        var func = this.postsSearchFunctions[redSocial].default;
        var result = await func();
        return result;
    }
}
export default PostsService;