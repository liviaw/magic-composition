import React from 'react';
import { render, screen } from '@testing-library/react';
import {Mood} from '../Mood';
import { OutputPresenter } from '../../../OutputPresenter';
import { MediaPresenter } from '../../../MediaPresenter';

test('always renders short button when media is ready', () => {
  const mediaPresenter = new MediaPresenter();
  const outputPresenter = new OutputPresenter();
  render(<Mood mediaPresenter={mediaPresenter} outputPresenter={outputPresenter}/>);
  const linkElement = screen.getByText(/short/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders medium button when duration is enough', () => {
    const mediaPresenter = new MediaPresenter();
    const outputPresenter = new OutputPresenter();
    render(<Mood mediaPresenter={mediaPresenter} outputPresenter={outputPresenter}/>);
    const linkElement = screen.getByText(/medium/i);
    expect(linkElement).toBeInTheDocument();
});