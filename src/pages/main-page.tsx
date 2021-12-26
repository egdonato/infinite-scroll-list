import { HouseItem } from "./../components/house-item-component";
import { HouseContainer } from "../styles/house-item-style";
import { HouseSkeleton } from "../components/skeleton-style";
import React, { useEffect, useRef, useState } from "react";
import { HousesModel, HouseModel } from "./../models/house-model";
import client from "./../services/homevision-client";
import { useVirtual } from "react-virtual";
import useIntersectionObserver from "@react-hook/intersection-observer";

export function Main() {
  const [housesResponse, setHousesResponse] = useState<HousesModel>({
    houses: [],
    ok: true,
  });
  const housesPerPage: number = 12;
  const [totalHouses, setTotalHouses] = useState<number>(housesPerPage); //Same as housesPerPage by default
  const [currentPage, setCurrentPage] = useState<number>(1); //Start first page
  const parentRef = useRef<HTMLHeadingElement>(null);
  const [target, setTarget] = useState<HTMLHeadingElement | null>(null);
  const observer = useIntersectionObserver(target, { threshold: 1 });

  const rowVirtualizer = useVirtual({
    size: totalHouses,
    parentRef: parentRef,
    estimateSize: React.useCallback(() => 200, []),
    overscan: 1,
  });

  useEffect(() => {
    if (observer.isIntersecting)
      setCurrentPage((prev) => {
        return prev + 1;
      });
  }, [observer.isIntersecting]);

  useEffect(() => {
    callService(currentPage);
    setTotalHouses(housesResponse.houses.length + housesPerPage);
  }, [currentPage]); //Solo se vuelve a ejecutar si cambia currentPage

  function callService(page: number) {
    client
      .get<HousesModel>(`/houses?page=${page}&per_page=${housesPerPage}`)
      .then((response) => {
        setHousesResponse((prev) => {
          // Copy of the array with the houses that already exists
          // This is necessary in order to the new list doesn't replace the old one
          let oldHouses: HouseModel[] = [...prev.houses];
          //Combination of the old array with de new array of the service response
          let newHouses: HouseModel[] = [...oldHouses, ...response.data.houses];

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

  return (
    <div ref={parentRef}>
      <HouseContainer style={{ height: `${rowVirtualizer.totalSize}px` }}>
        {rowVirtualizer.virtualItems.map((item) => {
          return (
            <div
              key={item.index}
              ref={setTarget}
              style={{
                width: "30%",
                height: item.size,
                transform: `translateY(10px)`,
              }}
            >
              {!housesResponse.houses[item.index] ? (
                <HouseSkeleton />
              ) : (
                <HouseItem item={housesResponse.houses[item.index]} />
              )}
            </div>
          );
        })}
      </HouseContainer>
    </div>
  );
}
