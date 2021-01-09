import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MapcardState from './mapcard-state';

describe('MapcardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<MapcardState stateId={2} />);
        expect(baseElement).toBeTruthy();
    });
});