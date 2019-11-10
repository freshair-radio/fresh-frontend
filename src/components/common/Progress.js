import React, { Component } from "react";
import { findDOMNode } from "react-dom";

// import './reset.css'
// import './defaults.css'
// import './range.css'
// import './App.css'

import ReactPlayer from "react-player";
function Duration({ className, seconds }) {
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={className}>
            {format(seconds)}
        </time>
    );
}

function format(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
}

function pad(string) {
    return ("0" + string).slice(-2);
}

class App extends Component {
    state = {
        url: null,
        playing: true,
        controls: false,
        light: false,
        played: 0,
        duration: 0
    };

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0
        });
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    handleStop = () => {
        this.setState({ url: null, playing: false });
    };

    handleToggleControls = () => {
        const url = this.state.url;
        this.setState(
            {
                controls: !this.state.controls,
                url: null
            },
            () => this.load(url)
        );
    };

    handleToggleLight = () => {
        this.setState({ light: !this.state.light });
    };

    handlePlay = () => {
        console.log("onPlay");
        this.setState({ playing: true });
    };

    handlePause = () => {
        console.log("onPause");
        this.setState({ playing: false });
    };

    handleSeekMouseDown = e => {
        this.setState({ seeking: true });
    };

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) });
    };

    handleSeekMouseUp = e => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    };

    handleProgress = state => {
        console.log("onProgress", state);
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        }
    };

    handleEnded = () => {
        console.log("onEnded");
        this.setState({ playing: this.state.loop });
    };

    handleDuration = duration => {
        console.log("onDuration", duration);
        this.setState({ duration });
    };

    ref = player => {
        this.player = player;
    };
    render() {
        const { url, playing, controls, light, played, duration } = this.state;

        return (
            <div className="app">
                <section className="section">
                    <div className="react-player-wrapper">
                        <ReactPlayer
                            className="react-player"
                            width="0px"
                            height="0px"
                            ref={this.ref}
                            url={this.props.audio}
                            playing={this.props.playing}
                            controls={controls}
                            light={light}
                            config={{ file: { forceAudio: true } }}
                            onReady={() => console.log("onReady")}
                            onStart={() => console.log("onStart")}
                            onPlay={this.handlePlay}
                            onPause={this.handlePause}
                            onBuffer={() => console.log("onBuffer")}
                            onSeek={e => console.log("onSeek", e)}
                            onEnded={this.handleEnded}
                            onError={e => console.log("onError", e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                        />
                    </div>
                    <div className="scrubber-container">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={played}
                            onMouseDown={this.handleSeekMouseDown}
                            onChange={this.handleSeekChange}
                            onMouseUp={this.handleSeekMouseUp}
                            className="podcast-scrubber"
                        />
                        <Duration seconds={duration * (1 - played)} />
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
