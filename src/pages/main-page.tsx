import { HouseList } from "./../components/house-list-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { HousesModel, HouseModel } from "./../models/house-model";

export function Main() {
  const initialValue: HousesModel = { houses: [], ok: true };
  const [housesResponse, setHousesResponse] =
    useState<HousesModel>(initialValue);

  useEffect(() => {
    getHouses();
  }, []);

  const housesPerPage: number = 1;
  const totalPages: number = 3;

  function getHouses() {
    for (let i = 1; i <= totalPages; i++) {
      let status = false;
      while (status) {
        status = true;
        axios
          .get<HousesModel>(
            `http://app-homevision-staging.herokuapp.com/api_project/houses?page=${i}&per_page=${housesPerPage}`
          )
          .then((res) => {
            setHousesResponse((prev) => {
              // Copy of the array with the houses that already exists
              // This is necessary in order to the new list doesn't replace the old one
              let oldHouses: HouseModel[] = [...prev.houses];
              //Combination of the old array with de new array of the service response
              let newHouses: HouseModel[] = oldHouses.concat(res.data.houses);

              // A new HousesModel is generated with the new houses data
              // Service status is also added
              let newHouseResponse: HousesModel = {
                houses: newHouses,
                ok: res.data.ok,
              };

              return newHouseResponse;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return <div>{<HouseList houseItemList={housesResponse} />}</div>;
}
