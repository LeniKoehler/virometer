import { cleanup, render } from '@testing-library/react';
import React from 'react';
import NumberboxcardState from './numberboxcard-state';

describe('NumberboxcardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<NumberboxcardState stateId={2} />);
        expect(baseElement).toBeTruthy();
    });
});