import React from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

const ShowCard = ({ show, idx, noLimit, noTitle, noLink }) => {
    const url = `/shows/${show.slug}/`;
    const feature_image = show.feature_image || `/images/4x/Aspect.png`;
    return (
        <article
            className={`show-card post-card ${show.featured && "featured"} ${
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
                    </Link>
                ))}

            <div className="post-card-content">
                {noLink ? (
                    <span className="post-card-content-link">
                        {!noTitle && (
                            <header className="post-card-header">
                                <h2 className="post-card-title">
                                    {show.title}
                                </h2>
                            </header>
                        )}
                        <section className="post-card-excerpt">
                            <p>
                                {noLimit
                                    ? show.excerpt
                                    : show.excerpt
                                          .split(" ")
                                          .slice(0, 33)
                                          .join(" ")}
                            </p>
                        </section>
                    </span>
                ) : (
                    <Link className="post-card-content-link" to={url}>
                        {!noTitle && (
                            <header className="post-card-header">
                                <h2 className="post-card-title">
                                    {show.title}
                                </h2>
                            </header>
                        )}
                        <section className="post-card-excerpt">
                            <p>
                                {noLimit
                                    ? show.excerpt
                                    : show.excerpt
                                          .split(" ")
                                          .slice(0, 33)
                                          .join(" ")}
                            </p>
                        </section>
                    </Link>
                )}

                <footer className="post-card-meta">
                    <ul className="author-list">
                        {show.authors.map((author, ai) => (
                            <li key={ai} className="author-list-item">
                                <div className="author-name-tooltip">
                                    {author.name}
                                </div>
                                {author.profile_image ? (
                                    <Link
                                        to={`/author/${author.slug}`}
                                        className="static-avatar"
                                    >
                                        <img
                                            className="author-profile-image"
                                            src={author.profile_image}
                                            alt={author.name}
                                        />
                                    </Link>
                                ) : (
                                    <Link
                                        to={`/author/${author.slug}`}
                                        className="static-avatar author-profile-image"
                                    >
                                        <img
                                            className="default-avatar"
                                            src="/images/icons/avatar.svg"
                                            alt={show.primary_author.name}
                                        />
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </footer>
            </div>
        </article>
    );
};

export default ShowCard;
