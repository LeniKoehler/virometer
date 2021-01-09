import { cleanup, render } from '@testing-library/react';
import React from 'react';
import StatesStartPage from './states-startpage';

describe('StatesStartpage', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const match = { params: { stateId: 0 } }
        const { baseElement } = render(<StatesStartPage match={match} />);
        expect(baseElement).toBeTruthy();
    });
});