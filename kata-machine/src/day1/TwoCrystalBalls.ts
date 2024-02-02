export default function two_crystal_balls(breaks: boolean[]): number {
    const jAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jAmount;

    for (; i < breaks.length; i += jAmount) {
        if (breaks[i]) {
            break;
        }
    }

    i -= jAmount;

    for (let j = 0; j < jAmount && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
