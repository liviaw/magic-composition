import React from 'react';
import { render, screen } from '@testing-library/react';
import {Mood} from '../Mood';
import { OutputPresenter } from '../../../OutputPresenter';
import { MediaPresenter } from '../../../MediaPresenter';

import { shallow } from "enzyme";

/**
  * testing with shallow from https://enzymejs.github.io/enzyme/docs/api/shallow.html
  * Reason being Shallow rendering is used when you don't need any children
  * components loaded to properly test your component, in which we are testing 
  * buttons and info in the Mood components
 */

const openSharedPage = () => {
  console.log("a function");
}
const mediaPresenter = new MediaPresenter();
const outputPresenter = new OutputPresenter();

describe("Mood component", () => {
  it('displays the correct value', () => {
    const mood = shallow(<Mood mediaPresenter={mediaPresenter} outputPresenter={outputPresenter} openSharedPage={openSharedPage}/>)

  });

  it('always renders short button when media is ready', () => {
    const mediaPresenter = new MediaPresenter();
    const outputPresenter = new OutputPresenter();
    render(<Mood mediaPresenter={mediaPresenter} outputPresenter={outputPresenter} openSharedPage={openSharedPage}/>);
    const linkElement = screen.getByText(/short/i);
    expect(linkElement).toBeInTheDocument();
  });
  
})


test('renders medium button when duration is enough', () => {
    const mediaPresenter = new MediaPresenter();
    const outputPresenter = new OutputPresenter();
    render(<Mood mediaPresenter={mediaPresenter} outputPresenter={outputPresenter} openSharedPage={openSharedPage} />);
    const linkElement = screen.getByText(/medium/i);
    expect(linkElement).toBeInTheDocument();
});