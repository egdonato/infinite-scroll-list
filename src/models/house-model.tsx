export type HouseModel = {
  id: number;
  address: string;
  homeowner: string;
  price: number;
  photoURL: string;
};

export type HousesModel = {
  houses: HouseModel[];
  ok: boolean;
};
