import { mdToHtml, mdToAnsi } from './reader.js';
import fs from 'fs/promises';
import { exec } from 'child_process';

describe('Markdown Parser', () => {