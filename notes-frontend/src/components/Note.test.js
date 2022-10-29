// import dependencies
import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  expect(element).toBeDefined();
});

test("renders content with container and querySelector", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const { container } = render(<Note note={note} />);

  // use CSS-selectors to find rendered elements by using the method querySelector of the object container that is one of the fields returned by render method
  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = jest.fn();
  render(<Note note={note} toggleImportance={mockHandler} visible="true" />);

  const user = userEvent.setup();

  const button = screen.getByLabelText("unmark important");

  screen.debug(button);
  // click the element with method click of the userEvent-library
  await user.click(button);

  // the mock function is called exactly once, (all mock funcs have .mock property)
  expect(mockHandler.mock.calls).toHaveLength(1);
});
