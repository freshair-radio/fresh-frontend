import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges.slice(0, 4);
    const videos = data.allYoutubeVideo.edges;

    const instas = data.allInstaNode.edges;
    const events = data.events.edges.slice(0, 4);
    const [album, setAlbum] = React.useState("");
    const [sent, setSent] = React.useState(false);
    const submit = () => {
        setSent(true);
        fetch("https://bugreport.freshair.org.uk", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: "A FreshAir fan",
                show: "album@freshair.dev",
                message: `I vote for "${album}" as Album of the Year`
            })
        });
    };
    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} bodyClass="home-template">
                <div className="inner">
                    <h2 className="latest album-of-the-year">
                        What was your "Album of the Decade"? Let us know!
                    </h2>
                    <div class="post-full-content aoy">
                        {sent ? (
                            <p style={{ padding: "20px" }}>Thanks!</p>
                        ) : (
                            <>
                                <input
                                    class="album-input"
                                    placeholder="My Favourite Nursery Rhymes by the Funsong band"
                                    value={album}
                                    onChange={e => setAlbum(e.target.value)}
                                ></input>
                                <button class="album-submit" onClick={submit}>
                                    Send
                                </button>
                            </>
                        )}
                    </div>

                    {!!events.length && (
                        <>
                            <h2 className="latest">Events</h2>

                            <div className="post-feed instagram">
                                {events.map(({ node }, idx) => (
                                    <PostCard
                                        key={node.id}
                                        post={node}
                                        idx={idx}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <h2 className="latest">Instagram</h2>

                    <div className="post-feed instagram">
                        {instas.map(({ node }, idx) => (
                            <article class="post-card show-grid-item">
                                <a
                                    href={`https://www.instagram.com/p/${node.id}`}
                                    target="_blank"
                                    class="insta-link"
                                >
                                    {" "}
                                    <img src={node.preview} class="insta" />
                                </a>
                            </article>
                        ))}
                    </div>
                    <h2 className="latest">Wee Sessions</h2>

                    <section className="post-feed wee-sessions">
                        {videos.map(({ node }) => (
                            <section class={`show-grid-item wide post-card`}>
                                <YouTube videoId={node.videoId} />
                            </section>
                        ))}
                    </section>
                    <h2 className="latest">Latest articles</h2>

                    <div className="post-feed">
                        {posts.map(({ node }, idx) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} idx={idx} />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
            filter: { tags: { elemMatch: { slug: { eq: "hash-article" } } } }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        events: allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
            filter: {
                tags: { elemMatch: { slug: { eq: "hash-events-team" } } }
            }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        allInstaNode(limit: 4, sort: { fields: timestamp, order: DESC }) {
            edges {
                node {
                    id
                    likes
                    comments
                    mediaType
                    preview
                    original
                    timestamp
                    caption
                    localFile {
                        childImageSharp {
                            fixed(width: 150, height: 150) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    # Only available with the public api scraper
                    thumbnails {
                        src
                        config_width
                        config_height
                    }
                    dimensions {
                        height
                        width
                    }
                }
            }
        }
        allYoutubeVideo(limit: 6) {
            edges {
                node {
                    videoId
                }
            }
        }
    }
`;
