import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  margin: 15px auto 50px;
  font-style: italic;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    max-width: 95% !important;
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 26px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 26px;
      padding: 0 180px;
    `};

    ${mediaqueries.phablet`
      font-size: 36px;
      padding: 0 20px 0 40px;
    `};
  }
`;

export default Blockquote;
