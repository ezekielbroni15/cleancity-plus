import { fireEvent, render, screen } from "@testing-library/react";
import FactGenerator from "./FactGenerator";
import { facts } from "@/data/facts";

afterEach(() => {
  jest.restoreAllMocks();
});

test("FactGenerator does not show the same fact twice in a row", () => {
  jest.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0.24);

  render(<FactGenerator />);

  expect(screen.getByText(facts[0])).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /new fact/i }));

  expect(screen.queryByText(facts[0])).not.toBeInTheDocument();
  expect(screen.getByText(facts[1])).toBeInTheDocument();
});
