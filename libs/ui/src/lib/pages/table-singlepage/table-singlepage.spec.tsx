import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TableSinglePage from './table-singlepage';

describe('TableSinglePage', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const match = { params: { countyId: "0" } }
        const { baseElement } = render(<TableSinglePage match={match} />);
        expect(baseElement).toBeTruthy();
    });
});