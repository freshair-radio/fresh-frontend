import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import YouTube from "react-youtube";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import ShowCard from "../components/common/ShowCard";
import PodcastCard from "../components/common/PodcastCard";
/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag;
    const o_posts = data.allGhostPost.edges;
    const videos = data.allYoutubeVideo.edges;
    const posts = o_posts.filter(
        ({ node }) =>
            !node.tags.find(t => t.slug == "hash-description") &&
            node.tags.find(t => t.slug == "hash-article")
    );

    let description = o_posts
        .map(({ node }) => node)
        .find(p => p.tags.find(t => t.slug == "hash-description"));

    let hub_show = o_posts
        .map(({ node }) => node)
        .find(p => p.tags.find(t => t.slug == "hash-show"));
    const podcasts = hub_show
        ? o_posts.filter(({ node }) =>
              node.tags.find(t => t.slug == "hash-podcast")
          )
        : [];
    const regex = /<audio src="(.*?)"/;
    const get_audio = html => {
        let m = html.match(regex);
        return m ? m[1] : "";
    };
    const href = tag.slug
        .split("-")
        .slice(1, -1)
        .join("-");
    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout bodyClass={tag.name.slice(1)}>
                <div className="inner">
                    <header className="m-top tag-header">
                        <a href={`/teams/${href}`}>
                            <h1>{tag.name.slice(1)}</h1>
                        </a>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    {description ? (
                        <section className="post-full-content description">
                            <div
                                className="post-content load-external-scripts"
                                dangerouslySetInnerHTML={{
                                    __html: description.html
                                }}
                            />
                        </section>
                    ) : (
                        hub_show && (
                            <>
                                <div className="inner">
                                    <div className="show-description">
                                        <ShowCard
                                            key={hub_show.id}
                                            show={{
                                                ...hub_show,
                                                featured: true
                                            }}
                                            idx={0}
                                            noLimit
                                            noTitle
                                            noLink
                                        />
                                    </div>
                                </div>
                                {!!podcasts.length && (
                                    <div className="inner">
                                        <section className="post-feed show team">
                                            {podcasts.map(({ node }) => (
                                                // The tag below includes the markup for each post - components/common/PostCard.js
                                                <PodcastCard
                                                    key={node.id}
                                                    podcast={node}
                                                    style={
                                                        "block " +
                                                        tag.name.slice(1)
                                                    }
                                                    audio={
                                                        typeof window !==
                                                        `undefined`
                                                            ? get_audio(
                                                                  node.html
                                                              )
                                                            : {}
                                                    }
                                                    defaultImg={
                                                        hub_show.feature_image
                                                    }
                                                />
                                            ))}
                                        </section>
                                    </div>
                                )}
                            </>
                        )
                    )}
                    {tag.slug == "hash-wee-sessions-team" ? (
                        <section className="post-feed wee-sessions">
                            {videos.map(({ node }) => (
                                <section
                                    class={`show-grid-item wide post-card`}
                                >
                                    <YouTube videoId={node.videoId} />
                                </section>
                            ))}
                        </section>
                    ) : (
                        <>
                            <section className="team post-feed">
                                {posts.map(({ node }) => (
                                    // The tag below includes the markup for each post - components/common/PostCard.js
                                    <PostCard key={node.id} post={node} />
                                ))}
                            </section>
                        </>
                    )}
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        allGhostPost: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
};

export default Tag;

export const pageQuery = graphql`
    query GhostTeamQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
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
