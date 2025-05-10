import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import BlueskyMainViewComponent from "../../feeds/mainViews/BlueskyMainViewComponent";
import BlueskyPostComponent from "../views/BlueskyPostComponent";

class BlueskyThreadComponent extends ThreadComponent{

    doFormatPost(){
        return <div>
            {this.parsear()}
        </div>;
    }

    parsear(){
        var post = this.state.post;
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
    doFormatComment(comment){
        return <BlueskyPostComponent post={comment}></BlueskyPostComponent>
    }



}
export default BlueskyThreadComponent;