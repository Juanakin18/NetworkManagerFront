import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import BlueskyMainViewComponent from "../../feeds/mainViews/BlueskyMainViewComponent";
import BlueskyPostComponent from "../views/BlueskyPostComponent";
import BlueskyPostsListComponent from "../../feeds/postsLists/BlueskyPostsListComponent";

class BlueskyThreadComponent extends ThreadComponent{

    doFormatPost(){
        return <div>
            {this.parsear()}
        </div>;
    }

    parsear(){
        var post = this.state.post.post;
        var media = <div>

        </div>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var imageDisplays=[];
                var images = post.embed.images;
                media=<div>
                    {images.map((image)=>{
                        return <img src={image.fullsize} alt={image.alt}/>
                    })}
                </div>
            }
        }

        return <section>
            <article>
                <img src={post.author.avatar} alt={post.author.displayName} onClick={()=>{this.zoomToUser("bluesky", post.author.handle)}}/>
                <h5>
                    {post.author.displayName}
                </h5>
                <p>
                    {post.author.handle}
                </p>
            </article>
            <article>
                <h6>{post.record.text}</h6>
                {media}
            </article>
            <section>
                <p>{post.likeCount}</p>
                <button onClick={this.like}>Dar like</button>
                <p>{post.repostCount}</p>
                <button onClick={this.repost}>Repostear</button>
            </section>
        </section>
    }

    async like(){
        await this.state.postsService.like(this.state.post);
    }

    async repost(){
        await this.state.postsService.repost(this.state.post);
    }
    doFormatCommentsList(){
        return <BlueskyPostsListComponent getList={this.getCommentsList.bind(this)}
                                          zoom={this.setPost.bind(this)}
                                          parent={this}
        ></BlueskyPostsListComponent>
    }

    getCommentsList(){
        return this.state.post.comments;
    }

    async setPost(network,post){
        var post = await this.state.postsService.getPostById(network,post);
        this.state.post=post;
        this.setState(this.state)
    }



}
export default BlueskyThreadComponent;