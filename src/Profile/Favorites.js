import React, { Component } from 'react';
import postService from '../Services/postService'
import PostThumbnail from '../Profile/PostThumbnail'

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: undefined
        };
    }

    async componentDidMount() {
        let favorites = await postService.get_favorites();
        let post_promises = []
        for (let favorite of favorites.data) {
            post_promises.push(postService.get_by_id(favorite.post_id));
        }

        Promise.all(post_promises).then(posts => {
            this.setState({
                posts: posts.map(p => {
                    return {
                        id: p.data.id,
                        image_url: p.data.image_url,
                        likes: p.data.likes - p.data.dislikes,
                        comments: p.data.comments.length
                    }
                })
            });
        })
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="container">
                <div className="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-12 row my-4">
                    {posts && posts.length > 0 && posts.map((post,i) => (
                        <PostThumbnail post={post}></PostThumbnail>
                    ))}

                    { !posts && (
                        <p className="text-center">Loading...</p>
                    ) }
                    { posts && posts.length === 0 && (
                        <p className="text-center">You don't have any favorite posts yet.</p>
                    ) }
                </div>

            </div>
        )
    }
}

export default Favorites;