const wordEnding = (time) => {
    if (time % 100 >= 11 && time % 100 <= 14) {
        return '';
    }
    if (time % 10 === 1) {
        return 'у';
    }
    if ([2, 3, 4].includes(time % 10)) {
        return 'и';
    }
    return '';
};

export const formatTimeLeft = (seconds) => {
    if (seconds >= 3600) {
        const hours = Math.round(seconds / 3600);
        return `${hours} годин${wordEnding(hours)}`;
    } else if (seconds >= 60) {
        const minutes = Math.round(seconds / 60);
        return `${minutes} хвилин${wordEnding(minutes)}`;
    } else {
        return `${seconds} секунд${wordEnding(seconds)}`;
    }
};