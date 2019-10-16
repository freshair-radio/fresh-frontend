import React from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

const PostCard = ({ post, idx }) => {
    const url = `/posts/${post.slug}/`;
    const readingTime = readingTimeHelper(post);
    const rating = post.tags.find(
        t => t.slug.endsWith("star") || t.slug.endsWith("stars")
    );
    const stars = rating ? rating.slug.split("-")[1] : null;
    const half = stars
        ? rating.slug.split("-")[2] == "5"
            ? true
            : false
        : false;
    const empty = stars ? 5 - parseInt(stars) - (half ? 1 : 0) : null;
    return (
        <article
            className={`show-grid-item post-card ${post.featured &&
                "featured"} ${
                post.feature_image
                    ? idx == 0
                        ? "post-card-large"
                        : ""
                    : "no-image"
            }`}
        >
            {
                <Link className="post-card-image-link" to={url}>
                    <div
                        className="post-card-image"
                        style={{
                            backgroundImage: `url(${post.feature_image})`
                        }}
                    ></div>
                    <div className="post-card-content">
                        <Link className="post-card-content-link" to={url}>
                            <header className="post-card-header">
                                {stars && (
                                    <span class="rating small">
                                        {[...Array(parseInt(stars))].map(n => (
                                            <img src="/images/icons/star-black.svg"></img>
                                        ))}
                                        {half && (
                                            <img src="/images/icons/star-half-black.svg"></img>
                                        )}
                                        {[...Array(empty)].map(n => (
                                            <img src="/images/icons/star-empty-black.svg"></img>
                                        ))}
                                    </span>
                                )}
                                <h2 className="post-card-title">
                                    {post.title}
                                </h2>
                            </header>

                            {/* <section className="post-card-excerpt">
                        <p>
                            {(post.excerpt || "")
                                .split(" ")
                                .slice(0, 33)
                                .join(" ")}
                        </p>
                    </section> */}
                        </Link>

                        {/* <footer className="post-card-meta">
                    <ul className="author-list">
                        {post.authors.map((author, ai) => (
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
                                            alt={post.primary_author.name}
                                        />
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <span className="reading-time">{readingTime}</span>
                </footer> */}
                    </div>
                </Link>
            }
        </article>
    );
};

export default PostCard;
