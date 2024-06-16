import axios from "axios";
import { getSecretaire } from "actions/secretaire.action";
import AdminHeader from "components/Headers/AdminHeader";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function GererSecretaire() {

  const dispatch = useDispatch();
  const secretaireInfo = useSelector((state) => state.secretaireReducer);
  const [editModal, setEditModal] = useState(false);
  const [selectedSecretaire, setSelectedSecretaire] = useState(null);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cin: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getSecretaire());
  }, [dispatch]);

  const handleValidation = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/user/approve/${id}`);
      // console.log("User confirmé avec succès !");
      dispatch(getSecretaire());
    } catch (error) {
      console.log("Erreur lors de la confirmation du user :");
    }
  };

  const handleInvalidation = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/unapprove/${id}`
      );
      // console.log("User invalidé avec succès !");
      dispatch(getSecretaire());
    } catch (error) {
      console.log("Erreur lors de l'invalidation du user ");
    }
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
    setErrors(null);
  };

  const handleEdit = (secretaire) => {
    setSelectedSecretaire(secretaire);
    setFormData({
      lastName: secretaire.lastName,
      firstName: secretaire.firstName,
      email: secretaire.email,
      password: "", // Pas de mot de passe en clair
      confirmPassword: "", // Réinitialiser la confirmation de mot de passe
      cin: secretaire.cin,
      phone: secretaire.phone,
    });
    toggleEditModal();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setErrors({ confirmPassword: "Les mots de passe ne correspondent pas, veuillez confirmer le mot de passe, s'il vous plaît !" });
    return;
  }
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/update/${selectedSecretaire.email}`,
        formData
      );
      dispatch(getSecretaire());
      alert("Modification effectuée avec succès");
      toggleEditModal();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set error messages from backend
      } else {
        alert("Erreur lors de la soumission du formulaire");
      }
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
                Gérer le secrétaire ici !
              </h1>
              <div className="text-center text-body">
                <hr className="my-4" />
                <p>
                  ⚡NB: Un sécretaire ayant un accès non autoriser ne pourra pas
                  se connecter !
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
                  <th scope="col">Mot de passe</th>
                  <th scope="col">Cin</th>
                  <th scope="col">Téléphone</th>
                  {/* <th scope="col">Date d'inscription</th> */}
                  <th scope="col">Gestion d'accès</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {Array.isArray(secretaireInfo) &&
                  secretaireInfo.map((secretaire, index) => (
                    <tr key={index}>
                      <td>{secretaire.lastName}</td>
                      <td>{secretaire.firstName}</td>
                      <td>{secretaire.email}</td>
                      <td>{secretaire.password}</td>
                      <td>{secretaire.cin}</td>
                      <td>{secretaire.phone}</td>
                      {/* <td>{formatDate(secretaire.createdAt)}</td> */}
                      <td
                        className={
                          secretaire.isAdminApproved ? "text-green" : "text-red"
                        }
                      >
                        {secretaire.isAdminApproved
                          ? "Autoriser"
                          : "non autoriser"}
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
                          <DropdownMenu
                            className="dropdown-menu-arrow"
                            positionFixed
                          >
                            <DropdownItem
                              onClick={(e) =>
                                handleValidation(e, secretaire._id)
                              }
                            >
                              Autoriser l'accès
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) =>
                                handleInvalidation(e, secretaire._id)
                              }
                            >
                              Ne pas autoriser l'accès
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleEdit(secretaire)}
                            >
                              Modifier
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

      {/* Modal for editing a secretaire */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Modifier Secretaire</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="lastName">Nom</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">Prenom</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Entrer le nouveau Mot de passe</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirmer le Mot de passe</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
              />
            </FormGroup>
            {(errors?.confirmPassword || errors?.incorrectPassword )&& (
              <Alert color="danger" className="alert-dismissible">
                {errors.confirmPassword}
                {errors.incorrectPassword && <p>{errors.incorrectPassword}</p>}
              </Alert>
            )}
            <FormGroup>
              <Label for="cin">Cin</Label>
              <Input
                type="text"
                name="cin"
                id="cin"
                value={formData.cin}
                onChange={handleFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Téléphone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">
                Enregistrer
              </Button>
              <Button color="secondary" onClick={toggleEditModal}>
                Annuler
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default GererSecretaire;
