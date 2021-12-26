import { HouseItem } from "./house-item-component";
import { HousesModel } from "../models/house-model";
import { HouseContainer } from "../styles/house-item-style";
import { HouseSkeleton } from "./skeleton-style";
import { AutoSizer, Collection } from "react-virtualized";

export function HouseList(props: { houseItemList: HousesModel }) {
  const list: HousesModel = props.houseItemList;
  const totalHouses: number = list.houses.length;
  let columnYMap: number[] = [];
  const GLUTTER_SIZE: number = 60;
  const WIDTH: number = 450;
  const HEIGHT: number = 550;

  // cellCount -------------------> How many rows there will be
  // cellRenderer ----------------> Responsible for rendering a cell given an row and column index
  // cellSizeAndPositionGetter ---> Callback responsible for returning size and offset/position information for a given cell

  const cellRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: number;
    style: React.CSSProperties;
  }) => {
    const house = list.houses[index]; //Finding the house

    return (
      <div key={key} style={style}>
        <HouseItem key={house.id} item={house}></HouseItem>
      </div>
    );
  };

  const cellSizeAndPositionGetter = ({ index }: { index: number }) => {
    const columnCount = 3; //Three houses per row
    const columnPosition = index % (columnCount || 1); // from 0 to 2, determines which column the house will have
    const x = columnPosition * (GLUTTER_SIZE + WIDTH); // "x" value depending the width and glutter
    const y = columnYMap[columnPosition] || 0; // first row is zero
    columnYMap[columnPosition] = y + HEIGHT + GLUTTER_SIZE; //To increment de "y" value depending the column position

    return {
      height: HEIGHT,
      width: WIDTH,
      x: x,
      y: y,
    };
  };

  return (
    <HouseContainer>
      <AutoSizer>
        {({ height, width }) => (
          <Collection
            cellCount={totalHouses}
            cellRenderer={cellRenderer}
            cellSizeAndPositionGetter={cellSizeAndPositionGetter}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </HouseContainer>
  );
}
