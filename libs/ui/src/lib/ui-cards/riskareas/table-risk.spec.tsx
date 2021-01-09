import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TablecardRisk from './table-risk';

describe('TablecardRisk', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<TablecardRisk />);
        expect(baseElement).toBeTruthy();
    });
});