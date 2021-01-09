import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MapSinglePage from './map-singlepage';

describe('CountyStartpage', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const match = { params: { countyId: "0" } }
        const { baseElement } = render(<MapSinglePage match={match} />);
        expect(baseElement).toBeTruthy();
    });
});