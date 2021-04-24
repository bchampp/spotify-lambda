import { render, screen } from '@testing-library/react';
import App from './App';

describe('Page Rendering Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('It renders the Spotify Logo', () => {
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });

  test('It renders the information text', () => {
    const infoText: string = "A Spotify Authentication Lambda using Serverless";
    const infoElement = screen.getByText(infoText);
    expect(infoElement).toBeInTheDocument();
  });


  test('It renders the sign in button', () => {
    const signInText: string = "Sign In";
    const linkElement = screen.getByText(signInText);
    expect(linkElement).toBeInTheDocument();
  });
  
});
