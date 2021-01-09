import { cleanup, render } from '@testing-library/react';
import React from 'react';
import NumberboxcardCty from './numberboxcard-cty';

describe('LinediagramcardCty', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<NumberboxcardCty countyId={2} />);
        expect(baseElement).toBeTruthy();
    });
});