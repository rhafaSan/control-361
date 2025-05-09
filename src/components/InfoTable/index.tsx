export type VehicleData = {
  plate: string;
  fleet: string;
  type: string;
  model: string;
  status: string;
};

interface TableVehicleProps {
  data: VehicleData[];
  className?: string;
}

export const VehicleTable: React.FC<TableVehicleProps> = ({
  data,
  className,
}) => {
  return (
    <div className={`${className} overflow-x-auto `}>
      <table className="min-w-full text-white text-sm text-center  border-spacing-y-2">
        <thead className="bg-tertiary text-white">
          <tr>
            <th className="px-4 py-3">Placa</th>
            <th className="px-4 py-3">Frota</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Modelo</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vehicle, index) => (
            <tr
              key={index}
              className="bg-secondary hover:bg-secondary/90 rounded-lg"
            >
              <td className="px-4 py-2 border border-gray-600">
                {vehicle.plate}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {vehicle.fleet}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {vehicle.type === "vehicle" ? "Motor" : "Implemento"}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {vehicle.status === "active" ? "Em rota" : ""}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {vehicle.model}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
