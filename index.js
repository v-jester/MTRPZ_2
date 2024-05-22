import fs from 'fs/promises';
import path from 'path';
import { mdToHtml, mdToAnsi } from './reader.js';

const file = process.argv[2];
const outIdx = process.argv.indexOf('--out');
const formatIdx = process.argv.indexOf('--format');
const format = formatIdx !== -1 ? process.argv[formatIdx + 1] : 'ansi';

if (!file) {
    throw new Error('No file path provided'); 
}
(async () => {
    const mdText = await fs.readFile(file, 'utf-8'); 