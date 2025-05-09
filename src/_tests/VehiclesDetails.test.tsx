// __tests__/MapWithTrucks.test.tsx
import { render, waitFor } from "@testing-library/react";
import VehicleDetails, {
  type VehicleDetailsProps,
} from "../components/VehicleDetails";

jest.mock("@react-google-maps/api", () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  GoogleMap: ({ children }: any) => <div>{children}</div>,
  Marker: ({ position }: any) => (
    <div data-testid="marker">
      {position.lat},{position.lng}
    </div>
  ),
  OverlayView: ({ children }: any) => <div>{children}</div>,
}));

const trucks: VehicleDetailsProps[] = [
  {
    plate: "XYZ9876",
    fleet: "F123",
    datetime: "2025-12-12T15:32",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    onClose: jest.fn(),
  },
];

describe("MapWithTrucks", () => {
  it("deve renderizar um marcador para cada caminhão", async () => {
    const { getAllByTestId } = render(
      <VehicleDetails
        coordinates={trucks[0].coordinates}
        datetime={trucks[0].datetime}
        plate={trucks[0].plate}
        fleet={trucks[0].fleet}
        onClose={trucks[0].onClose}
      />
    );
    await waitFor(() => {
      const markers = getAllByTestId("marker");
      expect(markers.length).toBe(1);
    });
  });
});
