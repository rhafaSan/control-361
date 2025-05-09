// __tests__/Filters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import RadioButtonGroup from "../components/RadioGroup";

describe("RadioButtonGroup", () => {
  it("chama onChange ao clicar em uma opção", () => {
    const handleChange = jest.fn();
    render(
      <RadioButtonGroup
        options={[
          { label: "Rastreados", value: "tracked" },
          { label: "Outros", value: "other" },
        ]}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByLabelText("Outros"));
    expect(handleChange).toHaveBeenCalledWith("other");
  });
});
