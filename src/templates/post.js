import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import BylineSingle from "../components/common/BylineSingle";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout bodyClass="post-template">
                <div className="inner">
                    <article
                        className={`post-full ${post.featured &&
                            "featured"} ${!post.feature_image && "no-image"}`}
                    >
                        <header className="post-full-header">
                            <section className="post-full-meta">
                                <time
                                    className="post-full-meta-date"
                                    dateTime={post.published_at}
                                >
                                    {post.published_at_pretty}
                                </time>
                            </section>
                            <h1 className="post-full-title">{post.title}</h1>
                        </header>
                        {post.feature_image && (
                            <figure className="post-full-image">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                />
                            </figure>
                        )}

                        <section className="post-full-content">
                            <div
                                className="post-content load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>

                        <footer className="post-full-footer">
                            <BylineSingle author={post.primary_author} />
                        </footer>
                    </article>
                </div>
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
