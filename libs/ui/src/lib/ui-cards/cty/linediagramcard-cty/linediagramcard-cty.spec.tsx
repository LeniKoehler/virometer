import { cleanup, render } from '@testing-library/react';
import React from 'react';
import LinediagramcardCty from './linediagramcard-cty';

describe('LinediagramcardCty', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<LinediagramcardCty countyId={2} />);
        expect(baseElement).toBeTruthy();
    });
});