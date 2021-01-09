import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MapcardRisk from './map-risk';

describe('MapcardRisk', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<MapcardRisk />);
        expect(baseElement).toBeTruthy();
    });
});