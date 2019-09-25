import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/global.css";
import "../../styles/screen.css";
import "../../styles/custom.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="site-wrapper">
                {/* The main header section on top of the screen */}
                <header
                    className="site-header outer responsive-header-img"
                    style={{
                        ...(site.cover_image &&
                            isHome && {
                                backgroundImage: `url(${site.cover_image})`
                            })
                    }}
                >
                    <div className="inner">
                        {isHome && <div className="site-header-content"></div>}

                        <nav className="site-nav">
                            <div className="site-nav-left">
                                {!isHome && (
                                    <Link className="site-nav-logo" to="/">
                                        <img src={site.logo} alt={site.title} />
                                    </Link>
                                )}
                                <Navigation
                                    data={site.navigation}
                                    navClass="site-nav-item"
                                />
                            </div>
                            <div className="site-nav-right">
                                <div className="social-links"></div>
                            </div>
                        </nav>
                    </div>
                </header>

                <main id="site-main" className="site-main outer">
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>
                <footer className="site-footer outer">
                    <div className="site-footer-content inner">
                        <section className="copyright">
                            <Link to="/">{site.title}</Link> &copy; 2019
                        </section>
                    </div>
                </footer>
            </div>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired
    }).isRequired
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
