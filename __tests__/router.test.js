/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js';

describe('history stack length is', () => {
    test('2 after pushing settings state', () => {
        expect(pushToHistory('settings').length).toBe(2);
    });

    test('3 after pushing entry state', () => {
        expect(pushToHistory('entry', 1).length).toBe(3);
    });

    test('4 after pushing default state', () => {
        expect(pushToHistory().length).toBe(4);
    });
});

describe('current state object is accurate after pushing', () => {
    test('settings state', () => {
        expect(pushToHistory('settings').state).toEqual({ page: 'settings' });
    });

    test('entry state', () => {
        expect(pushToHistory('entry', 2).state).toEqual({ page: 'entry2' });
    });

    test('default state', () => {
        expect(pushToHistory().state).toEqual({});
    });
});