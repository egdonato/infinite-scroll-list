import { House, Container, Information } from "../styles/house-item-style";

export function HouseItem() {
  return (
    <House>
      <Container>
        <img
          src="https://image.shutterstock.com/image-photo/traditional-english-semidetached-house-260nw-231369511.jpg"
          alt="casa 1"
        />
        <Information>
          <h3>52 South Ridge St. Vienna, VA 22180</h3>
          <span>$152639</span>
          <span>For sale by Lucca Benson</span>
          {/* #d7d7d8 */}
        </Information>
      </Container>
    </House>
  );
}
