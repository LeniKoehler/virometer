import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TablecardState from './tablecard-state';

describe('TablecardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<TablecardState />);
        expect(baseElement).toBeTruthy();
    });
});