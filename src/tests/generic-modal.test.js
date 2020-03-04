import React from 'react';
import { render } from '@testing-library/react';
import GenericModal from '../components/generic-modal';

test('renders article card component', () => {
    const { baseElement } = render(<GenericModal
        isOpen={true}
        toggleModal={() => { }}
        modalTitle="Test Modal Title"
    />);
    expect(baseElement).toBeInTheDocument();
});
