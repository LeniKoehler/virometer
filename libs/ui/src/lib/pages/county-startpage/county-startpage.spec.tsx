import { cleanup, render } from '@testing-library/react';
import React from 'react';
import CountyStartpage from './county-startpage';

describe('CountyStartpage', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const match = { params: { countyId: "0" } }
        const { baseElement } = render(<CountyStartpage match={match} />);
        expect(baseElement).toBeTruthy();
    });
});