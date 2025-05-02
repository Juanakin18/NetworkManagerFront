import React from "react";
import PostComponent from "./PostComponent";
import parse from "html-react-parser";


class RedditPostComponent extends PostComponent{
    doFormatPost(){
        var post = this.state.parent.state.postsList[this.state.index];
        return (
            <div>
                {this.parsear(post)}
            </div>)
    }

    parsear(post){
        console.log(post)
        var thumbnail = post.thumbnail;
        var url = post.url;
        var title = post.title;
        var media = post.secure_media_embed.content;

        if(media!=undefined){
            console.log(media)
            var result = media.replace("&gt;",">");
            result = result.replace("&lt;","<");
            result = result.replace("&lt;","<");
            result = result.replace("&gt",">");
            result = result.substring(0, result.length-1);
            console.log(result)
            media = parse(result);
        }



        return <section>
            <h3>{title}</h3>
            <img src={thumbnail} alt={"Thumbnail"} className={"thumbnail"}/>
            <img src={url} alt={"URL"}/>
            <div>{media}</div>

        </section>
    }

    displayPost(){
        this.state.zoomPost("reddit",this.state.post);
    }

}
export default RedditPostComponent;