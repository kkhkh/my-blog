import React from "react";
import styled from "styled-components";
import myblog_cat_buti from "../assets/my_blog_cat_buti.png";

const Box = styled.div`
  padding: 80px 60px;
  background: #b7b7be;
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 50px;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  /* background: red; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 150px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 17px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;

// 画像
const StyledImg = styled.img`
  width: 300px;
`;

const Footer = () => {
  return (
    <Box>
      <Container>
        <StyledImg src={myblog_cat_buti} />
        <Row>
          <Column>
            <FooterLink href="#">ホーム</FooterLink>
            <FooterLink href="#">利用規約</FooterLink>
            <FooterLink href="#">よくある質問</FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">2D変換</FooterLink>
            <FooterLink href="#">3D変換</FooterLink>
            <FooterLink href="#">ラスタ変換</FooterLink>
            <FooterLink href="#">変換ソフト</FooterLink>
            <FooterLink href="#">他の製品</FooterLink>
            <FooterLink href="#">CAD口座</FooterLink>
          </Column>
          <Column>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
