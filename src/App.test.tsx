import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

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

  test('renders all time view when all time option is selected', async () => {
    render(<App/>);

    const link = screen.getByText(/All Time/);
    await userEvent.click(link);

    expect(screen.getByText(/all time option is selected/)).toBeInTheDocument();
    expect(screen.getByText(/monthly option is selected/)).not.toBeInTheDocument();
  });

  test('renders all time view when all time option is selected', async () => {
    render(<App/>);

    const link = screen.getByText(/Monthly/);
    await userEvent.click(link);

    expect(screen.getByText(/all time option is selected/)).not.toBeInTheDocument();
    expect(screen.getByText(/monthly option is selected/)).toBeInTheDocument();
  });

});
