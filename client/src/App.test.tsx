import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Sign In button', () => {
  render(<App />);
  const linkElement = screen.getByText('Sign In');
  expect(linkElement).toBeInTheDocument();
});
