import { chkClosed, chkNested } from './controllersError.js';

describe('Error Controllers', () => {

    describe('chkClosed', () => {

        it('should throw an error if no closing marker is found', () => {
            const text = 'This is **bold text';
            expect(() => chkClosed(text, /\*\*(?=\S)/g, /(?<=\S)\*\*/g, /\*\*(.+?)\*\*/g)).toThrow('There is no closing marker');
        });

        it('should not throw an error if closing marker is found', () => {
            const text = 'This is **bold** text';
            expect(() => chkClosed(text, /\*\*(?=\S)/g, /(?<=\S)\*\*/g, /\*\*(.+?)\*\*/g)).not.toThrow();
        });
    });

    describe('chkNested', () => {