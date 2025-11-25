import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}
