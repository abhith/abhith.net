import styled from "@emotion/styled";
const Hoverable = styled("div")`
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 15px 45px -5px rgba(7, 10, 25, 0.25);
    transform: translate(0, -2px);
  }
`;
export default Hoverable;
