import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TextcardRiskDef from './textcard-risk-def';

describe('TextcardRiskDef', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<TextcardRiskDef />);
        expect(baseElement).toBeTruthy();
    });
});