const bReg = /(?<=[ ,.:;\n\t]|^)\*\*(?=\S)(.+?)(?<=\S)\*\*(?=[ ,.:;\n\t]|$)/g;
const iReg = /(?<=[ ,.:;\n\t]|^)_(?=\S)(.+?)(?<=\S)_(?=[ ,.:;\n\t]|$)/g;
const mReg = /(?<=[ ,.:;\n\t]|^)`(?=\S)(.+?)(?<=\S)`(?=[ ,.:;\n\t]|$)/g;
const regs = [bReg, iReg, mReg];

const lbReg = /(?<=[ ,.:;\n\t]|^)\*\*(?=\S)/g;
const rbReg = /(?<=\S)\*\*(?=[ ,.:;\n\t]|$)/g;
const liReg = /(?<=[ ,.:;\n\t]|^)_(?=\S)/g;
const riReg = /(?<=\S)_(?=[ ,.:;\n\t]|$)/g;
const lmReg = /(?<=[ ,.:;\n\t]|^)`(?=\S)/g;
const rmReg = /(?=\S)`(?=[ ,.:;\n\t]|$)/g;

const markers = ['**', '_', '`'];

const setParas = (text) => {
    const paras = text.split('\n\n').filter((par) => par.trim() !== '');
    const htmlParas = paras.map((par) => `<p>${par.trim()}</p>\n`);
    return htmlParas.join('');
};

const setPre = (text) => {
    if (!text.startsWith('\n')) {
        throw new Error('Should be line break after preformatted marker');
    }
    if (!text.endsWith('\n')) {
        throw new Error('Should be line break before last preformatted marker');
    }
    return `<pre>${text.trim()}</pre>\n`;
};

const setTags = (text) => {
    return text
        .replace(bReg, '<b>$1</b>')
        .replace(iReg, '<i>$1</i>')
        .replace(mReg, '<tt>$1</tt>');
};

const setAnsiTags = (text) => {
    return text
        .replace(bReg, '\x1b[1m$1\x1b[0m')
        .replace(iReg, '\x1b[3m$1\x1b[0m')
        .replace(mReg, '\x1b[7m$1\x1b[0m');
};


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