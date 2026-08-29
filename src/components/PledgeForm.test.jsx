import { fireEvent, render, screen } from "@testing-library/react";
import PledgeForm from "./PledgeForm";

test("PledgeForm rejects empty pledges and long pledges", () => {
  const addPledge = jest.fn();
  render(<PledgeForm onAdd={addPledge} />);

  fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

  expect(screen.getByText("Pledge text is required.")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/your pledge/i), { target: { value: "a".repeat(281) } });
  fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

  expect(screen.getByText("Keep your pledge under 280 characters.")).toBeInTheDocument();
  expect(addPledge).not.toHaveBeenCalled();
});

test("PledgeForm submits trimmed text and resets character count", () => {
  const addPledge = jest.fn();
  render(<PledgeForm onAdd={addPledge} />);

  fireEvent.change(screen.getByLabelText(/your pledge/i), {
    target: { value: "  I will rinse containers before recycling.  " }
  });
  expect(screen.getByText("45/280")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /submit pledge/i }));

  expect(addPledge).toHaveBeenCalledWith("I will rinse containers before recycling.");
  expect(screen.getByText("0/280")).toBeInTheDocument();
});
