import SocialMediaMainViewComponent from "../mainViews/SocialMediaMainViewComponent";
import RedditPostComponent from "../../posts/views/RedditPostComponent";
import React from "react";
import FeedComponent from "./FeedComponent";
import RedditPostsListComponent from "../postsLists/RedditPostsListComponent";

class SubredditComponent extends FeedComponent{

    getSocialMedia(){
        return "reddit";
    }
    doFormatPosts() {
            return <RedditPostsListComponent getList={this.getPostsFromFeed.bind(this)}
                                             zoom={this.state.zoomPost}
                                             parent={this}
            ></RedditPostsListComponent>

    }

    doParse(){
        var feed = this.state.getFeed();
        return <div class="blueskyProfile">
            <img src={feed.community_icon} alt={feed.display_name}/>
            <img src={feed.banner_background_image} alt={feed.display_name}/>
            <article>
                <h2>{feed.display_name}</h2>
                <p>{feed.public_description}</p>
            </article>
            <article>
                <h3>Información general</h3>
                <div>
                    <h4>Suscriptores</h4>
                    <p>{feed.subscribers}</p>
                </div>
                <div>
                    <h4>Conectados</h4>
                    <p>{feed.accounts_active}</p>
                </div>
            </article>
        </div>;
    }


}

export default SubredditComponent;