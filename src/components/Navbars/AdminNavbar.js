// export default AdminNavbar;
import { Link } from "react-router-dom";
import { useAuth } from "components/AuthContext";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  // Assuming userReducer is where your user data is stored
  const userData = useSelector((state) => state.userReducer);
  const [searchText, setSearchText] = useState("");
  const profileImageUrl = `${process.env.REACT_APP_API_URL}${userData?.profileImage}`;

  const { logout } = useAuth();
  const handleLogout = async () => {
    logout(); // Appeler la fonction logout lors du clic sur le bouton de déconnexion
  };

  // Handler to prevent the default form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchText(""); // Clear the search input text
  };


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/labo/profile"
          >
            {props.brandText}
          </Link>
          <Form
            className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
            onSubmit={handleSearchSubmit}
          >
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search"
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="..." src={profileImageUrl} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userData.firstName} {userData.lastName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/labo/profile" tag={Link}>
                  <i className="ni ni-single-02 mr-2" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run mr-2" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
