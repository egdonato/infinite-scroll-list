import { HouseList } from "./../components/house-list-component";
import { useEffect, useState } from "react";
import { HousesModel, HouseModel } from "./../models/house-model";
import client from "./../services/homevision-client";

export function Main() {
  const initialValue: HousesModel = { houses: [], ok: true };
  const [housesResponse, setHousesResponse] =
    useState<HousesModel>(initialValue);

  const housesPerPage: number = 20;
  const totalPages: number = 1000;

  useEffect(() => {
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      callService(pageNumber);
    }
  }, []);

  function callService(page: number) {
    client
      .get<HousesModel>(`/houses?page=${page}&per_page=${housesPerPage}`)
      .then((response) => {
        setHousesResponse((prev) => {
          // Copy of the array with the houses that already exists
          // This is necessary in order to the new list doesn't replace the old one
          let oldHouses: HouseModel[] = [...prev.houses];
          //Combination of the old array with de new array of the service response
          let newHouses: HouseModel[] = oldHouses.concat(response.data.houses);

          // A new HousesModel is generated with the new houses data
          // Service status is also added
          let newHouseResponse: HousesModel = {
            houses: newHouses,
            ok: response.data.ok,
          };

          return newHouseResponse;
        });
      });
  }

  return <div>{<HouseList houseItemList={housesResponse} />}</div>;
}
