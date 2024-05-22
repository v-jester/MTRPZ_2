const markers = ['**', '_', '`'];

const chkClosed = (text, lReg, rReg, reg) => {
    const cleanedText = text.replace(/\\\*\*/g, '').replace(/\\_/g, '').replace(/\\`/g, '');

    const matches = cleanedText.match(reg);
    const lMatches = cleanedText.match(lReg);
    const rMatches = cleanedText.match(rReg);

    const totalMatches = matches ? matches.length * 2 : 0;
    const lCount = lMatches ? lMatches.length : 0;
    const rCount = rMatches ? rMatches.length : 0;

    if (lCount + rCount !== totalMatches) {
        throw new Error('There is no closing marker');
    }
};

const chkNested = (text, reg, mark) => {
    
    const parts = text.match(reg);
    if (parts) {
        for (const part of parts) {
            const slice = part.slice(mark.length, -mark.length);
            if (
                slice.length > 2 &&
                (markers.includes(slice[0] + slice[1]) ||
                markers.includes(
                    slice[slice.length - 1] + slice[slice.length - 2]
                ))
            ) {
                throw new Error('Nested markers are not allowed');
            }
            if (
                slice.length > 1 &&
                (markers.includes(slice[0]) ||
                markers.includes(slice[slice.length - 1]))
            ) {
                throw new Error('Nested markers are not allowed');
            }
            if (
                slice.match(/\*\*/g)?.length > 1 ||
                slice.match(/_/g)?.length > 1 ||
                slice.match(/`/g)?.length > 1
            ) {
                throw new Error('Nested markers are not allowed');
            }
        }
    }
};
