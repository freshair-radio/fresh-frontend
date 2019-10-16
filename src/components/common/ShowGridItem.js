import React from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

const ShowGridItem = ({ show, idx, noLimit, noTitle, noLink }) => {
    const url = `/shows/${show.slug}/`;
    const feature_image = show.feature_image || `/images/4x/Aspect.png`;
    return (
        <article
            className={`show-card show-grid-item post-card ${show.featured &&
                "featured"} ${
                feature_image ? (idx == 0 ? "post-card-large" : "") : "no-image"
            }`}
        >
            {feature_image &&
                (noLink ? (
                    <span className="post-card-image-link">
                        <div
                            className="post-card-image"
                            style={{
                                backgroundImage: `url(${feature_image})`,
                                backgroundSize: "cover"
                            }}
                        ></div>
                        <div className="post-card-content">
                            <span className="post-card-content-link">
                                {!noTitle && (
                                    <header className="post-card-header">
                                        <h2 className="post-card-title">
                                            {show.title}
                                        </h2>
                                    </header>
                                )}
                            </span>
                        </div>
                    </span>
                ) : (
                    <Link className="post-card-image-link" to={url}>
                        <div
                            className="post-card-image"
                            style={{
                                backgroundImage: `url(${feature_image})`,
                                backgroundSize: "cover"
                            }}
                        ></div>
                        <div className="post-card-content">
                            <Link className="post-card-content-link" to={url}>
                                {!noTitle && (
                                    <header className="post-card-header">
                                        <h2 className="post-card-title">
                                            {show.title}
                                        </h2>
                                    </header>
                                )}
                            </Link>
                        </div>
                    </Link>
                ))}
        </article>
    );
};

export default ShowGridItem;
