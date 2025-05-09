import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import VehicleDetails from "../VehicleDetails";

export type Truck = {
  equipmentId: string;
  lat: number;
  lng: number;
  plate: string;
  fleet: string;
  createdAt: string;
};

type Props = {
  trucks: Truck[];
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapWithTrucks: React.FC<Props> = ({ trucks }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: trucks[0]?.lat || 0, lng: trucks[0]?.lng || 0 }}
      zoom={14}
    >
      {trucks.map((truck) => (
        <Marker
          key={truck.equipmentId}
          position={{ lat: truck.lat, lng: truck.lng }}
          icon={{
            url: "/assets/truck.png",
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          }}
          onClick={() => setSelectedTruck(truck)}
        />
      ))}

      {selectedTruck && (
        <OverlayView
          position={{ lat: selectedTruck.lat, lng: selectedTruck.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-7">
              <VehicleDetails
                plate={selectedTruck.plate}
                fleet={selectedTruck.fleet}
                datetime={selectedTruck.createdAt}
                coordinates={{
                  lat: selectedTruck.lat,
                  lng: selectedTruck.lng,
                }}
                onClose={() => setSelectedTruck(null)}
              />
            </div>
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  ) : (
    <p>Carregando mapa...</p>
  );
};

export default MapWithTrucks;
