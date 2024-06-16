import React from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Media,
} from "reactstrap";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Footer = () => (
  <footer className="footer bg-default">
    <Container>
      <Row className=" text-white">
        <Media className="align-items-center">
          <span className="avatar avatar-lg rounded">
            <img
              alt="..."
              src={require("../../assets/img/brand/irescomath.png")}
            />
          </span>
        </Media>
        <Col xl="4">
          <p>
            {" "}
            Email:{" "}
            <a href="mailto:haifa.touati@univgb.com" className="text-white">
              irescomath@gmail.com
            </a>
          </p>
          <p>Tel: +216 75 392 100</p>
          <p>Tel: +216 75 392 190</p>
          <p>
            {" "}
            SiteWeb:{" "}
            <a
              href="http://www.fsg.rnu.tn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              www.fsg.rnu.tn
            </a>
          </p>
          <p>
            {" "}
            <a
              href="https://www.google.com/maps?q=Cité+Erriadh+6072+Zrig+Gabès-Tunisie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Cité Erriadh 6072 Zrig Gabès-Tunisie
            </a>
          </p>
        </Col>
        <Col xl="4">
        <h5 className="text-white"> Personnels</h5>
              <div className="text-white mr-2">
                <ul >
                  <li>Enseignants-chercheurs corps A : 06</li>
                  <li>Enseignants-chercheurs corps B : 26</li>
                  <li>Doctorants : 18</li>
                  <li>Mastères : 08 </li>
                </ul>
              </div>
        </Col>

        <Col xl="2">
          <h5 className="text-white">Suivez-nous</h5>
          <div className="d-flex justify-content-start">
            <a href="https://www.facebook.com/profile.php?id=100093820744342" className="text-white mr-2">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.twitter.com" className="text-white mr-2">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.linkedin.com/search/results/all/?keywords=Irescomath&origin=GLOBAL_SEARCH_HEADER&sid=a9-" className="text-white">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </Col>
      </Row>

      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-white">
            © {new Date().getFullYear()}{" "}
              IRESCOMATH. Tous droits réservés.
          </div>
        </Col>
        <Col xl="6">
          <Nav className="nav-footer footer-dark justify-content-center justify-content-xl-end ">
            <NavItem>
              <NavLink href="/accueil/home">Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/accueil/about">A propos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/accueil/actuality">Acualités</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/accueil/contact">Contact</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
