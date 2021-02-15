import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { OutputPresenter } from "../OutputPresenter";
import { MediaPresenter } from "../MediaPresenter";

test("renders learn react link", () => {
  const mediaPresenter = new MediaPresenter();
  const outputPresenter = new OutputPresenter();
  render(<App mediaPresenter={mediaPresenter} outputPresenter={outputPresenter}/>);
  const linkElement = screen.getByText(/design/i);
  expect(linkElement).toBeInTheDocument();
});
