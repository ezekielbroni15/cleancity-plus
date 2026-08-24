import { fireEvent, render, screen } from "@testing-library/react";
import TrackerForm from "./TrackerForm";

test("TrackerForm rejects invalid input and shows specific messages", () => {
  const addEntry = jest.fn();
  render(<TrackerForm onAdd={addEntry} />);

  fireEvent.click(screen.getByRole("button", { name: /add item/i }));

  expect(screen.getByText("Choose a waste category before adding an item.")).toBeInTheDocument();
  expect(screen.getByText("Quantity is required.")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/waste category/i), { target: { value: "Plastic" } });
  fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "0" } });
  fireEvent.click(screen.getByRole("button", { name: /add item/i }));

  expect(screen.getByText("Quantity must be greater than 0.")).toBeInTheDocument();
  expect(addEntry).not.toHaveBeenCalled();
});
