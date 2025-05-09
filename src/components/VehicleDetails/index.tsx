import React from "react";

type VehicleDetailsProps = {
  plate: string;
  fleet: string;
  datetime: string;
  coordinates: { lat: number; lng: number };
  onClose: () => void;
};

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  plate,
  fleet,
  datetime,
  coordinates,
  onClose,
}) => {
  const date = new Date(datetime).toLocaleDateString();
  const datehour = new Date(datetime).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative bg-[#071B2F] text-white rounded-md px-4 py-2 text-sm shadow-lg w-max">
        <button
          className="absolute top-1 right-2 text-sky-400 font-bold"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div>Placa {plate}</div>
        <div>Frota {fleet}</div>
        <div>{`${date} - ${datehour}`}</div>
        <div>
          {coordinates.lat.toFixed(6)} , {coordinates.lng.toFixed(6)}
        </div>
      </div>

      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#071B2F]" />
    </div>
  );
};

export default VehicleDetails;
