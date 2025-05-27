import App from "./App";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
test("render the main app", () => {
  render(<App />);
  expect(screen.getByText(/A react based testing mockup/i)).toBeInTheDocument();
});
