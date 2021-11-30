import { HouseItem } from "./house-item-component";
import { HousesModel, HouseModel } from "../models/house-model";
import { HouseContainer, HouseRow } from "../styles/house-item-style";
import { HouseSkeleton } from "../styles/skeleton-style";
import { InfiniteLoader, List } from "react-virtualized";

export function HouseList(props: { houseItemList: HousesModel }) {
  const list: HousesModel = props.houseItemList;
  const totalHouses: number = list.houses.length;
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(height);

  // Constants that determine the status of each house
  const LOADING = 1;
  const LOADED = 2;
  let houseStatusMap: number[] = [];

  // isRowLoaded ------> Function responsible for tracking the loaded state of each row
  // loadMoreRows -----> It invokes a callback function when more rows must be loaded
  // rowHeight --------> The high of each row
  // rowCount ---------> How many rows there will be
  // rowRenderer ------> Function that is called for each row. Here we render that row
  // onRowsRendered ---> It informs the loader when the user is scrolling
  // registerChild ----> It enables a set of rows to be refreshed once their data has finished loading.

  const loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    for (let index: number = startIndex; index <= stopIndex; index++) {
      houseStatusMap[index] = LOADING;
    }
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        for (let index: number = startIndex; index <= stopIndex; index++) {
          houseStatusMap[index] = LOADED;
        }
        resolve();
      }, 500)
    );
  };

  const isRowLoaded = ({ index }: { index: number }) => !!houseStatusMap[index];

  function getMaxHousesPerRow(): number {
    return 3;
  }

  // function getHousesForRow(
  //   index: number,
  //   maxHousesPerRow: number
  // ): HouseModel[] {
  //   let startIndex: number = index * maxHousesPerRow;
  //   let endIndex: number = startIndex + maxHousesPerRow - 1;

  //   return list.houses.slice(startIndex, endIndex);
  // }

  // function RowHouseItems(props: {
  //   houses: HouseModel[];
  //   key: string;
  //   startIndex: number;
  //   endIndex: number;
  // }) {
  //   let houses: HouseModel[] = props.houses;
  //   let key: string = props.key;

  //   for (let index = 0; index <= 2; index++) {
  //     let house = houses[index];
  //     if (houseStatusMap[index] === LOADED) {
  //       <HouseItem key={house.id} item={house}></HouseItem>;
  //     } else {
  //       <HouseSkeleton key={key}></HouseSkeleton>;
  //     }
  //   }
  // }

  const rowRenderer = ({
    index,
    style,
    key,
  }: {
    index: number;
    style: React.CSSProperties;
    key: string;
  }) => {
    // let maxHousesPerRow: number = getMaxHousesPerRow();
    // let startIndex: number = index * maxHousesPerRow;
    // let endIndex: number = startIndex + maxHousesPerRow;
    // let housesForRow: HouseModel[] = list.houses.slice(startIndex, endIndex);
    // console.log(housesForRow);
    // let housesForRow: HouseModel[] = getHousesForRow(index, maxHousesPerRow);

    // return (
    //   <div style={style}>
    //     {housesForRow.map((house) => (
    //       <HouseItem key={house.id} item={house}></HouseItem>
    //     ))}
    //   </div>
    // );

    const house = list.houses[index]; //Finding the house

    if (houseStatusMap[index] === LOADED) {
      return (
        <HouseRow style={style}>
          <HouseItem key={house.id} item={house}></HouseItem>
        </HouseRow>
      );
    } else {
      return (
        <HouseRow style={style}>
          <HouseSkeleton key={key}></HouseSkeleton>
        </HouseRow>
      );
    }
  };

  return (
    <HouseContainer>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        rowCount={totalHouses}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            width={width}
            height={height}
            rowHeight={600}
            rowCount={totalHouses}
            rowRenderer={rowRenderer}
          />
        )}
      </InfiniteLoader>
    </HouseContainer>
  );
}
