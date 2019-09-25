import React from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

const BylineSingle = ({ author }) => {
    const url = `/author/${author.slug}/`;

    return (
        <>
            <section className="author-card">
                {author.profile_image ? (
                    <img
                        className="author-profile-image"
                        src={author.profile_image}
                        alt={author.name}
                    />
                ) : (
                    <span className="avatar-wrapper">
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g fill="none" fillRule="evenodd">
                                <path
                                    d="M3.513 18.998C4.749 15.504 8.082 13 12 13s7.251 2.504 8.487 5.998C18.47 21.442 15.417 23 12 23s-6.47-1.558-8.487-4.002zM12 12c2.21 0 4-2.79 4-5s-1.79-4-4-4-4 1.79-4 4 1.79 5 4 5z"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
                    </span>
                )}
                <section className="author-card-content">
                    <h4 className="author-card-name">
                        <Link to={url}>{author.name}</Link>
                    </h4>
                    {author.bio ? (
                        <p>{author.bio}</p>
                    ) : (
                        <p>
                            Read <Link to={url}>more posts</Link> by this
                            author.
                        </p>
                    )}
                </section>
            </section>
            <div className="post-full-footer-right">
                <Link className="author-card-button" to={url}>
                    Read More
                </Link>
            </div>
        </>
    );
};

export default BylineSingle;
