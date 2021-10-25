import { House, Container, Information } from "../styles/house-item-style";
import { HouseModel } from "../models/house-model";

export function HouseItem(props: { item: HouseModel }) {
  const item: HouseModel = props.item;
  return (
    <House>
      <Container>
        <img src={item.photoURL} alt={item.address} />
        <Information>
          <h3>{item.address}</h3>
          <span>${item.price}</span>
          <span>For sale by {item.homeowner}</span>
        </Information>
      </Container>
    </House>
  );
}
