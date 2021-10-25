import { HouseItem } from "./house-item-component";
import { HousesModel } from "../models/house-model";
import { HouseContainer } from "../styles/house-item-style";

export function HouseList(props: { houseItemList: HousesModel }) {
  const list: HousesModel = props.houseItemList;

  return (
    <HouseContainer>
      {list.houses.map((house) => {
        return <HouseItem key={house.id} item={house}></HouseItem>;
      })}
    </HouseContainer>
  );
}
