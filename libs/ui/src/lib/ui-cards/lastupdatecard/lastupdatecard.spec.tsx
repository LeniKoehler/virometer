import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Lastupdatecard from './lastupdatecard';

describe('Lastupdatecard', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<Lastupdatecard />);
        expect(baseElement).toBeTruthy();
    });
});