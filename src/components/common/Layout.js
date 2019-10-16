import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import useInterval from "./useInterval";
import { Navigation } from ".";
import config from "../../utils/siteConfig";
import Player from "./Player";
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
    const [bi, setBi] = React.useState({});
    useInterval(async () => {
        let bi = await fetch("https://nowplaying.freshair.org.uk").then(r =>
            r.json()
        );
        setBi(bi);
    }, 30000);
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
                                backgroundImage: `url(/images/4x/Aspect.png)`
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
                                <div className="hamburger">
                                    <input
                                        type="checkbox"
                                        name="menu"
                                        id="menu"
                                    />
                                    <label htmlFor="menu" className="close">
                                        <img
                                            className="site-menu-close"
                                            src="/images/icons/times.svg"
                                            alt={site.title}
                                        />
                                    </label>
                                    <label htmlFor="menu" className="open">
                                        <img
                                            className="site-menu"
                                            src="/images/icons/bars.svg"
                                            alt={site.title}
                                        />
                                    </label>
                                    <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                                </div>
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
                <div className="player">
                    <Player bi={bi} />
                </div>
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
