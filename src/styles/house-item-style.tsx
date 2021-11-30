import styled from "styled-components";

export const HouseContainer = styled.div`
  display: flex;
  row-gap: 50px;
  margin: auto;
  height: 100vh;

  & .ReactVirtualized__Grid__innerScrollContainer {
    display: flex;
    justify-content: space-around;
  }
`;

export const House = styled.div`
  background-color: #212529;
  border-radius: 20px;
`;

export const Container = styled.div`
  position: relative;
  color: white;

  & img {
    width: 100%;
    display: block;
    border-radius: 20px 20px 0 0;
    clip-path: polygon(0px 0px, 100% 0px, 100% 71.07%, -1px 93.03%);
  }
`;

export const Information = styled.div`
  padding: 0 25px 35px 25px;
  color: white;
  font-family: "Poppins", sans-serif;

  & span {
    display: block;
  }

  & span:nth-child(2) {
    font-size: 20px;
    font-weight: bold;
  }

  & span:nth-child(3) {
    font-size: 13px;
    margin-top: 12px;
    color: #d7d7d8;
  }
`;
