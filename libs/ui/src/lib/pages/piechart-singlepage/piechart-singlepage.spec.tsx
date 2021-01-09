import { cleanup, render } from '@testing-library/react';
import React from 'react';
import PiechartSinglePage from './piechart-singlepage';

describe('CountyStartpage', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const match = { params: { countyId: "0" } }
        const { baseElement } = render(<PiechartSinglePage match={match} />);
        expect(baseElement).toBeTruthy();
    });
});