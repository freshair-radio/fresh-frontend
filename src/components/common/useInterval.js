import React, { useState, useEffect, useRef } from "react";

export default function useInterval(callback, delay, immediate = true) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            if (immediate) {
                tick();
            }
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
