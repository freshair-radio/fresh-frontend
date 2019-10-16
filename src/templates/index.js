import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import InstagramEmbed from "react-instagram-embed";
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
    const instas = data.allInstaNode.edges;
    const events = data.events.edges;

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} bodyClass="home-template">
                <div className="inner">
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
    }
`;
