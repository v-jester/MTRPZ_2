import fs from 'fs/promises';
import path from 'path';
import { mdToHtml, mdToAnsi } from './reader.js';

const file = process.argv[2];
const outIdx = process.argv.indexOf('--out');