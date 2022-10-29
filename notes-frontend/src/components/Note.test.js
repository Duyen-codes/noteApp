// import dependencies
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import Note from "./Note";

test.only("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  screen.debug(element);
  expect(element).toBeDefined();
});

test("renders content with container and querySelector", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});
