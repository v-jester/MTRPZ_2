import { mdToHtml, mdToAnsi } from './reader.js';
import fs from 'fs/promises';
import { exec } from 'child_process';

describe('Markdown Parser', () => {

    test('should convert markdown to HTML', () => {
        const mdText = 'This is **bold**, _italic_, and `monospaced` text.';
        const result = mdToHtml(mdText);
        expect(result).toContain('<b>bold</b>');
        expect(result).toContain('<i>italic</i>');
        expect(result).toContain('<tt>monospaced</tt>');
    });

    test('should convert markdown to ANSI', () => {
        const mdText = 'This is **bold**, _italic_, and `monospaced` text.';
        const result = mdToAnsi(mdText);
        expect(result).toContain('\x1b[1mbold\x1b[0m');
        expect(result).toContain('\x1b[3mitalic\x1b[0m');
        expect(result).toContain('\x1b[7mmonospaced\x1b[0m');
    });