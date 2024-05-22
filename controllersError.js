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