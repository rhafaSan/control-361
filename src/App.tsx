import React from "react";
import { Button } from "./components/Button";
import { VehicleTable, type VehicleData } from "./components/InfoTable";
import Map, { type Truck } from "./components/Maps";
import RadioButtonGroup from "./components/RadioGroup";
import { TextField } from "./components/TextField";
import axiosClient from "./services/api";

function App() {
  const [vehiclesLocation, setVehiclesLocation] = React.useState<Truck[]>([]);
  const [vehicles, setVehicles] = React.useState<VehicleData[]>([]);
  const [vehicleType, setVehicleType] = React.useState<string>("tracked");
  const [searchValueVehicle, setSearchValueVehicle] =
    React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  const url: string =
    "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate";

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axiosClient.get(url, {
          params: {
            page: 1,
            type: "tracked",
            perPage: 20,
          },
        });

        if (response.data.statusCode === 200) {
          setVehiclesLocation(response.data.content.locationVehicles);
          setVehicles(response.data.content.vehicles);
          setHasMore(response.data.content.vehicles.length === 20);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialData();

    const intervalId = setInterval(async () => {
      try {
        const response = await axiosClient.get(url, {
          params: {
            page: 1,
            type: "tracked",
            perPage: 20,
          },
        });

        if (response.data.statusCode === 200) {
          setVehiclesLocation(response.data.content.locationVehicles);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore
      )
        loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const response = await axiosClient.get(url, {
        params: {
          page: nextPage,
          type: "tracked",
          perPage: 20,
        },
      });

      if (response.data.statusCode === 200) {
        const newVehicles = response.data.content.vehicles;
        setVehicles((prev) => [...prev, ...newVehicles]);
        setPage(nextPage);
        setHasMore(newVehicles.length === 20);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(url, {
          params: {
            page: 1,
            type: vehicleType,
            perPage: 20,
            filter: searchValueVehicle,
          },
        });

        if (response.data.statusCode === 200) {
          setVehicles(response.data.content.vehicles);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  return (
    <>
      <header className="bg-secondary w-full h-20 flex items-center  text-white">
        <h1 className="flex justify-start ml-4">Rafael Santos</h1>
      </header>
      <main className="bg-primary w-full min-h-screen flex flex-col items-center">
        <div className="w-[90%] bg-secondary max-w-7xl mx-auto px-5 sm:px-10 lg:px-[40px] mt-20 rounded-lg py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center text-white border-b-2 border-tertiary pb-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 items-center justify-center">
              <h2 className="text-lg font-semibold">Lista</h2>
              <RadioButtonGroup
                options={[
                  { label: "Rastreados", value: "tracked" },
                  { label: "Outros", value: "others" },
                ]}
                onChange={(value) => setVehicleType(value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <TextField
                onChange={(e) => setSearchValueVehicle(e.target.value)}
              />
              <Button text="Buscar" onClick={handleButtonClick} />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[550px] rounded-md overflow-hidden">
              <Map trucks={vehiclesLocation} />
            </div>
          </div>
        </div>
        <VehicleTable
          data={vehicles}
          className="w-[90%] bg-secondary max-w-7xl mx-auto   mt-10 mb-10 rounded-lg"
        />
      </main>
    </>
  );
}

export default App;
