import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import ShowGridItem from "../components/common/ShowGridItem";
/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag;
    const hub_shows = data.allGhostPost.edges.filter(
        ({ node }) => !!node.tags.find(t => t.slug == "hash-hub")
    );
    const other_shows = data.allGhostPost.edges.filter(
        ({ node }) => !node.tags.find(t => t.slug == "hash-hub")
    );

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>Shows</h1>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    <section className="post-feed">
                        {hub_shows.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <ShowGridItem key={node.id} show={node} />
                        ))}
                        {other_shows.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <ShowGridItem key={node.id} show={node} />
                        ))}
                    </section>
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
    query GhostShowsQuery($slug: String!, $limit: Int!, $skip: Int!) {
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
