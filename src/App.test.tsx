import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

describe("Growth Sessions Dashboard App", () => {
  test('renders the heading', () => {
    render(<App/>);
    const headingElement = screen.getByText(/GS Analytics Board/);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the links', () => {
    render(<App/>);
    expect(screen.getByText(/All Time/)).toBeInTheDocument();
    expect(screen.getByText(/Monthly/)).toBeInTheDocument();
  });

});
