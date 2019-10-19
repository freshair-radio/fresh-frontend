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
const WeeSessions = ({ data, location, pageContext }) => {
    const videos = data.allYoutubeVideo.edges;

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="inner">
                    <header className="m-top tag-header">
                        <h1>Wee Sessions</h1>
                        {/* {tag.description ? <p>{tag.description}</p> : null} */}
                    </header>

                    <section className="post-feed wee-sessions">
                        {videos.map(({ node }) => (
                            <section class={`show-grid-item wide post-card`}>
                                <YouTube videoId={node.videoId} />
                            </section>
                        ))}
                    </section>
                </div>
            </Layout>
        </>
    );
};

export default WeeSessions;

export const pageQuery = graphql`
    query GhostWeeSessionsQuery {
        allYoutubeVideo(limit: 6) {
            edges {
                node {
                    videoId
                }
            }
        }
    }
`;
