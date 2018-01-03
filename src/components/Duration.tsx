import * as React from "react";

interface IProps {
    duration?: number;
}

const formatDuration = (seconds?: number): string => {
    if (!seconds) {
        return "x:xx";
    }

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (seconds < 10) {
        // Zero-pad single digit seconds.
        return minutes + ":0" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
};

const Duration: React.StatelessComponent<IProps> = ({ duration }) => (
    <span>{formatDuration(duration)}</span>
);

export default Duration;
