import { cleanup, render } from '@testing-library/react';
import React from 'react';
import BarchartcardState from './barchartcard-state';

describe('BarchartcardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<BarchartcardState stateId={2} />);
        expect(baseElement).toBeTruthy();
    });
});