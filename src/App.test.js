import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Country wiki/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/A map/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders subhead', () => {
  render(<App />);
  const subheadElement = screen.getByText(/Find the information you want about countries easily/i);
  expect(subheadElement).toBeInTheDocument();
});

test('renders currency image', () => {
  render(<App />);
  const currencyImageElement = screen.getByAltText(/Picture of currency symbols/i);
  expect(currencyImageElement).toBeInTheDocument();
});

test('renders phone image', () => {
  render(<App />);
  const phoneImageElement = screen.getByAltText(/Picture of a phone/i);
  expect(phoneImageElement).toBeInTheDocument();
});

test('renders city image', () => {
  render(<App />);
  const cityImageElement = screen.getByAltText(/Image of a city skyline/i);
  expect(cityImageElement).toBeInTheDocument();
});

test('renders language image', () => {
  render(<App />);
  const langImageElement = screen.getByAltText(/Image of words in various languages/i);
  expect(langImageElement).toBeInTheDocument();
});

test('renders input info', () => {
  render(<App />);
  const inputInfoElement = screen.getByText(/Please select the information you would like and enter the country you would like the know about, then click the search button./i);
  expect(inputInfoElement).toBeInTheDocument();
})