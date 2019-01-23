export const roundDigits = (toRound: number, digits: number) => {
    return Math.round(toRound * Math.pow(10, digits)) / Math.pow(10, digits);
}

export const displayChfAmount = (amount: number) => {
    const rounded = roundDigits(amount, 2);
    const whole = rounded % 1 === 0;

    return `CHF ${rounded}${whole ? '.-' : ''}`;
}

export const truncateText = (text: string, max: number) => {
    if(text.length >= max) {
        return `${text.substring(0, max-3)}...`
    } else {
        return text;
    }
}