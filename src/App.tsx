import { HouseList } from "./components/house-list-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { HousesModel } from "./models/house-model";

function App() {
  const initialValue: HousesModel = { houses: [] };
  const [housesResponse, setHousesResponse] =
    useState<HousesModel>(initialValue);

  useEffect(() => {
    getHouse();
  });

  function getHouse() {
    axios
      .get<HousesModel>(
        "http://app-homevision-staging.herokuapp.com/api_project/houses?page=1&per_page=100"
      )
      .then((res) => {
        setHousesResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <div>{<HouseList houseItemList={housesResponse} />}</div>;
}

export default App;
