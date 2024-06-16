import axios from "axios";
import { getUsers } from "actions/users.action";
import AdminHeader from "components/Headers/AdminHeader";
import React, {useEffect} from "react";
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

function Membres() {
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
  const userData = useSelector((state) => state.userReducer);
  const usersInfo = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getUsers(userData.email));
  }, [dispatch, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/${id}`
      );
      // console.log("User supprimé avec succès !");
      dispatch(getUsers(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression de l'article :", error);
    }
  };

  const handleValidation = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/user/approve/${id}`);
      // console.log("User confirmé avec succès !");
      dispatch(getUsers(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression de l'article :", error);
    }
  };

  const handleInvalidation = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/unapprove/${id}`
      );
      console.log("User invalidé avec succès !");
      dispatch(getUsers(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du user ! :", error);
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
                Les Membres inscrits apparaitrons ici !
              </h1>
              <div className="text-center text-body">
                <hr className="my-4" />
                <p>
                ⚡NB: Les utilisateurs ayant un état d'inscription non confirmé
                  ne pourront pas se connecter !
                </p>
              </div>
            </CardHeader>
            <Table
              className="align-items-center table-dark table-flush"
              responsive
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Cin</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Date d'inscription</th>
                  <th scope="col">Etat d'inscription</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {Array.isArray(usersInfo) &&
                  usersInfo.map((user, index) => (
                    <tr key={index} className="lead">
                      <td>{user.lastName}</td>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.cin}</td>
                      <td>{user.phone}</td>

                      <td>{formatDate(user.createdAt)}</td>

                      <td
                        className={
                          user.isAdminApproved ? "text-green" : "text-red"
                        }
                      >
                        {user.isAdminApproved ? "confirmé" : "non confirmé"}
                      </td>

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
                        <DropdownMenu className="dropdown-menu-arrow" positionFixed>
                          <DropdownItem
                              onClick={(e) => handleValidation(e, user._id)}
                            >
                              confirmee l'inscription
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => confirmDelete(e, user._id)}
                            >
                              Supprimer
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => handleInvalidation(e, user._id)}
                            >
                              Ne pas confirmé l'inscription
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

export default Membres;
