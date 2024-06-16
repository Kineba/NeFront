import axios from "axios";
import AdminHeader from "components/Headers/AdminHeader";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Col,
  Card,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
  Container,
} from "reactstrap";
import { getContacts } from "actions/contact.action";

function AdminContact() {
  const formatDate = (isoDate) => {
    if (!isoDate) {
      return ""; //
    }
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.contactReducer);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/contact/${id}`
      );
      // console.log("User supprimé avec succès !");
      dispatch(getContacts());
    } catch (error) {
      console.log("Erreur lors de la suppression de l'article :", error);
    }
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      handleDelete(id);
    }
  };

  return (
    <>
      <AdminHeader />

      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="15">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-transparent border-0 ">
              <h1 className="heading-section text-info mb-4 text-center">
                Les informations de contact apparaitront ici!
              </h1>
              <div className="text-center text-body">
                <hr className="my-4" />
                <p>Rester en contact avec les internautes !</p>
              </div>
            </CardHeader>
            <Table
              className="align-items-center table-dark table-flush"
              responsive
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nom et Prénom</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Fax</th>
                  <th scope="col">Sujet</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date de contact</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {Array.isArray(Contact) &&
                  Contact.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.name}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.email}</td>
                      <td>{contact.address}</td>
                      <td>{contact.fax}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color="light"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-menu-arrow"
                            positionFixed
                          >
                            <DropdownItem
                              onClick={(e) => confirmDelete(e, contact._id)}
                            >
                              Supprimer
                            </DropdownItem>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              annuler
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default AdminContact;
