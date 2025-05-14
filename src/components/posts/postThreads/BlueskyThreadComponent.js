import React from "react";
import CommentSubmitFormComponent from "../replies/CommentSubmitFormComponent";
import ThreadComponent from "./ThreadComponent";
import RedditCommentComponent from "../replies/RedditCommentComponent";
import BlueskyMainViewComponent from "../../feeds/mainViews/BlueskyMainViewComponent";
import BlueskyPostComponent from "../views/BlueskyPostComponent";
import BlueskyPostsListComponent from "../../feeds/postsLists/BlueskyPostsListComponent";
import {Stack} from "@mui/material";

class BlueskyThreadComponent extends ThreadComponent{

    constructor(props) {
        super(props);
        this.state.previous = [];
    }
    doFormatPost(){
        return <div>
            {this.parsePrevious()}
            {this.parsear()}
        </div>;
    }

    parsePrevious(){
        var result = [];
        for (let i = 0; i < this.state.previous.length; i++) {
            var post = this.state.previous[i];
           result.push(this.parsearPrevious(post.post, i));
        }
        return result;

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

    parsearPrevious(post, index){
        var media = <div>

        </div>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var images = post.embed.images;
                media=<div>
                    {images.map((image)=>{
                        return <img src={image.fullsize} alt={image.alt}/>
                    })}
                </div>
            }
        }

        return <section onClick={()=>{this.goBackTo(index)}}>
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
        await this.refresh();
    }

    async repost(){
        await this.state.postsService.repost(this.state.post);
        await this.refresh();
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
        this.state.previous.push(this.state.post);
        this.state.post=post;
        this.setState(this.state)
    }

    goBackTo(index){
        var post ={};
        for(var i =0; i<=index; i++){
            post = this.state.previous.pop();
        }
        this.state.post= post;
        this.setState(this.state);
    }

    getSocialMedia(){
        return "bluesky";
    }
    getPostID(){
        var post = this.state.post;
        return post.post.id;
    }


}
export default BlueskyThreadComponent;