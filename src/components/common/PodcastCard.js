import React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";
const PodcastCard = ({ audio, podcast, defaultImg, idx }) => {
    const url = `/posts/${podcast.slug}/`;
    const [isPlaying, setIsPlaying] = useState(false);
    const play = () => {
        setIsPlaying(true);
        audio.play();
    };
    const pause = () => {
        setIsPlaying(false);
        audio.pause();
    };
    return (
        <article className={`podcast-card`}>
            {podcast.feature_image ? (
                <div
                    className="podcast-card-image"
                    style={{
                        backgroundImage: `url(${podcast.feature_image})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }}
                ></div>
            ) : (
                <div
                    className="podcast-card-image"
                    style={{
                        backgroundImage: `url(${defaultImg})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }}
                ></div>
            )}
            {isPlaying ? (
                <div className="control-overlay" onMouseDown={pause}>
                    <img src="/images/icons/pause.svg" />
                </div>
            ) : (
                <div className="control-overlay" onMouseDown={play}>
                    <img src="/images/icons/play.svg" />
                </div>
            )}
            <div className="podcast-card-content">
                <header className="podcast-card-header">
                    <h2 className="podcast-card-title">{podcast.title}</h2>
                </header>

                <section className="podcast-card-excerpt">
                    <p>
                        {podcast.excerpt
                            .split(" ")
                            .slice(0, 33)
                            .join(" ")}
                    </p>
                </section>
            </div>
        </article>
    );
};

export default PodcastCard;
