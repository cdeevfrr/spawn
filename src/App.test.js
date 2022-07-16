import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const canvasElement = screen.getByTestId(/game/i);
  expect(canvasElement).toBeInTheDocument();
});
