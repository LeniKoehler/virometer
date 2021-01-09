import { cleanup, render } from '@testing-library/react';
import React from 'react';
import PiechartcardState from './piechartcard-state';

describe('PiechartcardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<PiechartcardState stateId={2} />);
        expect(baseElement).toBeTruthy();
    });
});