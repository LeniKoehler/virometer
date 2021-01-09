import { cleanup, render } from '@testing-library/react';
import React from 'react';
import TextcardRiskInfo from './textcard-risk-info';

describe('LinediagramTextcardRiskInfocardCty', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<TextcardRiskInfo />);
        expect(baseElement).toBeTruthy();
    });
});