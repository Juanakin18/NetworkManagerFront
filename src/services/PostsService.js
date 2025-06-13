class PostsService{


    constructor(profilesService, postsRepository, usersService) {
        this.profilesService = profilesService;
        this.postsRepository = postsRepository;
        this.usersService = usersService;
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

    async postMultiple(postInfo, media, perfiles){
        if(perfiles.length==0){
            return {
                result:"ERROR",
                errors:{
                    users:[
                        "Tienes que seleccionar algún perfil para postear"
                    ]
                }
            }
        }
        var errorList = this.checkProfiles(postInfo, perfiles);
        if(errorList.errorsNumber>0){
            return {
                result:"ERROR",
                errors:errorList.errors
            }
        }

        for (const perfil in perfiles) {
            await this.post(postInfo, media, perfiles[perfil]);
        }
        return {result:"SUCCESS"}
    }

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

    async shareMultiple(postInfo, perfiles){
        var postToShare = postInfo.postToShare;
        var socialMedia=postInfo.socialMedia;
        var subreddit=postInfo.subreddit;
        var postContent=postInfo.postContent;
        var title=postInfo.title;

        var post = this.formatPost(postToShare, socialMedia, subreddit,postContent,title);
        var resultCode = "SUCCESS";
        var errors = {};
        for (const perfil in perfiles) {
            var result = await this.post(post, undefined, perfiles[perfil]);
            if(result.result!="SUCCESS")
                resultCode="FAILIURE";
        }
        return {result:resultCode,
        errors:errors}
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
        var result = await this.postsRepository.post(postInfo, media, perfil);
        if(result.status=="SUCCESS")
            return {
                result:"SUCCESS"
            }
        else
            return {
                result:"ERROR"
            }
    }

    async findPostsInFeed(redSocial, feed, profile){
        var func = this.postsSearchFunctions[redSocial].feed;
        var result = await func(feed, profile);
        this.postsFromFeeds = result;
        this.posts[redSocial] = result;
        return result;
    }

    async findPostsFromUser(redSocial, user, profile){
        var func = this.postsSearchFunctions[redSocial].user;
        var result = await func(user, profile);
        this.postsFromUsers = result;
        this.posts[redSocial] = result;
        return result;
    }

    async findPosts(redSocial, searchTerm, profile){
        var func = this.postsSearchFunctions[redSocial].posts;
        var result = await func(searchTerm, profile);
        this.posts[redSocial] = result;
        return result;
    }

    async findDefault(redSocial, profile){
        var func = this.postsSearchFunctions[redSocial].default;
        var result = await func(profile);
        this.posts[redSocial] = result;
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

    getPosts(socialMedia){
        return this.posts[socialMedia];
    }

    async refresh(){
        await this.getPostById(this.socialMedia, this.selectedPost)
    }
    async getPostById(redSocial, post, profile){
        this.socialMedia=redSocial;
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