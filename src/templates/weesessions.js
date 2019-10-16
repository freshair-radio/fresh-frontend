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
import YouTube from "react-youtube";
const WeeSessions = ({ data, location, pageContext }) => {
    const videos = data.allYoutubeVideo;

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>Wee Sessions</h1>
                    </header>

                    <h2 className="latest">Latest Posts</h2>
                    <section className="post-feed">
                        {videos.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <YouTube videoId={node.videoId} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

WeeSessions.propTypes = {
    data: PropTypes.shape({
        allYoutubeVideo: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    pageContext: PropTypes.object
};

export default WeeSessions;

export const pageQuery = graphql`
    query GhostYTQuery($slug: String!, $limit: Int!, $skip: Int!) {
        allYoutubeVideo {
            edges {
                node {
                    videoId
                }
            }
        }
    }
`;
