import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-dark">
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
    </footer>
  );
};

export default Footer;
