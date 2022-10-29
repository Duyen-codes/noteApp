import { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const addNote = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<NoteForm addNote={addNote} />);

  //   const input = screen.getByRole("textbox");
  //   const input = screen.getByPlaceholderText("write note content here");
  const input = container.querySelector("#note-input");

  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(addNote.mock.calls).toHaveLength(1);
  // expect first argument of the first call to be 'testing a form...'
  expect(addNote.mock.calls[0][0]).toBe("testing a form...");
});
