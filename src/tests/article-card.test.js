import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../components/article-card';

const props = {
    title: "Test Title",
    body: "Test Body",
    id: 999,
}

test('renders article card component', () => {
    const { baseElement } = render(<ArticleCard article={props} />);
    expect(baseElement).toBeInTheDocument();
});
