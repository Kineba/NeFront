import { useState } from "react";
import { useAuth } from "components/AuthContext";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const Sidebar = ({ routes = [{}], logo = {} }) => {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    logout(); // Appeler la fonction logout lors du clic sur le bouton de déconnexion
  };

  const userData = useSelector((state) => state.userReducer);
  const profileImageUrl = `${process.env.REACT_APP_API_URL}${userData?.profileImage}`

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenus({
      ...openSubmenus,
      [name]: !openSubmenus[name],
    });
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.subItems) {
        return (
          <div key={key}>
            <NavItem onClick={() => toggleSubmenu(prop.name)}>
              <NavLink href="#">
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
            <Collapse isOpen={openSubmenus[prop.name]}>
              {prop.subItems.map((subItem, subKey) => (
                <NavItem key={subKey} style={{ paddingLeft: '20px' }}>
                  <NavLink
                    to={subItem.layout + subItem.path}
                    tag={NavLinkRRD}
                    onClick={closeCollapse}
                  >
                    <i className={subItem.icon} />
                    {subItem.name}
                  </NavLink>
                </NavItem>
              ))}
            </Collapse>
          </div>
        );
      } else {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <div className="bg-white border border-danger rounded-circle">
              <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
            </div>
          </NavbarBrand>
        ) : null}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  {user ? (
                    <img alt="..." src={profileImageUrl} />
                  ) : (
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-1-800x800.jpg")}
                    />
                  )}
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/labo/profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <hr className="my-3" />
          <Nav navbar className="nav-pills">{createLinks(routes)}</Nav>
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
