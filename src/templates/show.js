import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

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
    const posts = data.allGhostPost.edges;
    let show = posts.find(p => p.node.tags.find(t => t.slug == "hash-show"));
    show = show ? show.node : null;
    const podcasts = posts.filter(p =>
        p.node.tags.find(t => t.slug == "hash-podcast")
    );
    // Horrible hack that *should* work if everyone follows instructions
    const regex = /<audio src="(.*?)"/;
    const get_audio = html => {
        let m = html.match(regex);
        return m ? m[1] : "";
    };
    return !show ? null : (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>{tag.name.slice(1)}</h1>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    <div className="inner">
                        <div className="show-description">
                            <ShowCard
                                key={show.id}
                                show={{ ...show, featured: true }}
                                idx={0}
                                noLimit
                                noTitle
                                noLink
                            />
                        </div>
                    </div>
                    {!!podcasts.length && (
                        <div className="inner">
                            <h2 className="latest">Latest Podcasts</h2>

                            <section className="post-feed show">
                                {podcasts.map(({ node }) => (
                                    // The tag below includes the markup for each post - components/common/PostCard.js
                                    <PodcastCard
                                        key={node.id}
                                        podcast={node}
                                        audio={
                                            typeof window !== `undefined`
                                                ? get_audio(node.html)
                                                : {}
                                        }
                                        defaultImg={show.feature_image}
                                    />
                                ))}
                            </section>
                        </div>
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
    query GhostShowQuery($slug: String!, $limit: Int!, $skip: Int!) {
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
    }
`;
