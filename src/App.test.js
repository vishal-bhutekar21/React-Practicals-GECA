import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Practicals heading', () => {
  render(<App />);
  const heading = screen.getByText(/practicals/i);
  expect(heading).toBeInTheDocument();
});
