import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TablecardCty from './tablecard-cty';

describe('LinediagramcardCty', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<TablecardCty />);
        expect(baseElement).toBeTruthy();
    });
});