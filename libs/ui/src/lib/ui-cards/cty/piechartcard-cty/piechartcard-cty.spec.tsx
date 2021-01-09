import { cleanup, render } from '@testing-library/react';
import React from 'react';
import PiechartcardCty from './piechartcard-cty';

describe('LinediagramcardCty', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<PiechartcardCty countyId={2} />);
        expect(baseElement).toBeTruthy();
    });
});