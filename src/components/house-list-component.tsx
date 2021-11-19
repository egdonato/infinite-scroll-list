import { HouseItem } from "./house-item-component";
import { HousesModel } from "../models/house-model";
import { HouseContainer } from "../styles/house-item-style";
import { HouseSkeleton } from "../styles/skeleton-style";
import { Fragment } from "react";

export function HouseList(props: { houseItemList: HousesModel }) {
  const list: HousesModel = props.houseItemList;

  return (
    <HouseContainer>
      {list.houses.map((house) => {
        return (
          <Fragment>
            <HouseItem key={house.id} item={house}></HouseItem>
            {/* <HouseSkeleton></HouseSkeleton> */}
          </Fragment>
        );
      })}
    </HouseContainer>
  );
}
