import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/app/not-found';

describe('404', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/404/i);

    expect(heading).toBeInTheDocument();
  });
});
