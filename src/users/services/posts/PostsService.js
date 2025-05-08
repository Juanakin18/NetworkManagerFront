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

    async findPostsInFeed(redSocial, feed, searchTerm){
        var func = this.postsSearchFunctions[redSocial].feed;
        var result = await func(feed, searchTerm);
        this.postsFromFeeds[feed.nombreFeed] = result;
        return result;
    }

    async findPostsFromUser(profile, searchTerm){
        var func = this.postsSearchFunctions[profile.redSocial].user;
        var result = await func(profile.nombrePerfil, searchTerm);
        this.postsFromUsers[profile.nombrePerfil] = result;
        return result;
    }

    async findPosts(redSocial, searchTerm){
        var func = this.postsSearchFunctions[redSocial].posts;
        var result = await func(searchTerm);
        this.posts = result;
        return result;
    }

    async findDefault(redSocial){
        var func = this.postsSearchFunctions[redSocial].default;
        var result = await func();
        this.posts = result;
        return result;
    }

    getPostsFromFeed(feed){
        return this.postsFromFeeds[feed.nombreFeed];
    }

    getPostsFromUser(profile){
        return this.postsFromUsers[profile.nombrePerfil];
    }

    getSelectedPost(){
        return this.selectedPost;
    }

    setSelectedPost(post){
        this.selectedPost = post;
    }
}
export default PostsService;