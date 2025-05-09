// __tests__/VehicleTable.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VehicleTable } from "../components/InfoTable";

const mockData = [
  {
    plate: "ABC1234",
    fleet: "5863",
    type: "vehicle",
    model: "Volvo",
    status: "Online",
  },
];

describe("VehicleTable", () => {
  it("renderiza os dados corretamente", () => {
    render(<VehicleTable data={mockData} />);
    expect(screen.getByText("ABC1234")).toBeInTheDocument();
    expect(screen.getByText("5863")).toBeInTheDocument();
    expect(screen.getByText("Volvo")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("renderiza o número correto de colunas", () => {
    render(<VehicleTable data={mockData} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(5); // ou o número de colunas da tabela
  });
});
