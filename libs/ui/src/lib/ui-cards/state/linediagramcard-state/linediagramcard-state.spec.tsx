import { cleanup, render } from '@testing-library/react';
import React from 'react';
import LinediagramcardState from './linediagramcard-state';

describe('LinediagramcardState', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<LinediagramcardState stateId={2} />);
        expect(baseElement).toBeTruthy();
    });
});