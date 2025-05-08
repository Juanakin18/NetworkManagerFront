import React from "react";
import PostComponent from "./PostComponent";

class BlueskyPostComponent extends PostComponent{


    doFormatPost(){
        var post = this.state.getPostInfo(this.state.index);
        return this.parsear(post);
    }

    displayPost(){
        var post = this.state.getPostInfo(this.state.index);
        this.state.zoomPost("bluesky",post);
    }

    parsear(post){
        var media = <div>

        </div>;
        if(post.embed!=undefined){
            if(post.embed.$type.includes("image")){
                var imageDisplays=[];
                var images = post.embed.images;
                media=<div>
                    {images.map((image)=>{
                        return <img src={image.thumb} alt={image.alt}/>
                    })}
                </div>
            }
        }

        return <section>
            <article>
                <img src={post.author.avatar} alt={post.author.displayName}/>
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
            <h3>{post.content}</h3>
        </section>
    }

}
export default BlueskyPostComponent;