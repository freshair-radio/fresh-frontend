import React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";
const Player = ({ bi }) => {
    const isAlreadyPlaying =
        typeof window !== `undefined` && window.radio
            ? !window.radio.paused
            : false;
    const [isPlaying, setIsPlaying] = useState(isAlreadyPlaying);
    const play = () => {
        setIsPlaying(true);
        window.radio = new Audio("https://localhost:7878/radio");
        window.radio.play();
    };
    const pause = () => {
        setIsPlaying(false);
        window.radio.pause();
        window.radio = new Audio("");
    };
    return (
        <article className={`podcast-card`}>
            <div
                className="podcast-card-image"
                style={{
                    backgroundImage: `url(${bi.pic ||
                        `/images/4x/Aspect.png`})`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`
                }}
            ></div>

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
                    <h2 className="podcast-card-title">
                        {bi.title
                            ? `Live Now: ${bi.title}`
                            : "Freshair Playlist"}
                    </h2>
                </header>

                <section className="podcast-card-excerpt">
                    <p>
                        {(bi.status || "")
                            .split(" ")
                            .slice(0, 33)
                            .join(" ")}
                    </p>
                </section>
            </div>
        </article>
    );
};

export default Player;
