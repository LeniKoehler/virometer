import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { UpperBar } from './upperbar';

describe('UpperBar', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<UpperBar />);
        expect(baseElement).toBeTruthy();
    });
});