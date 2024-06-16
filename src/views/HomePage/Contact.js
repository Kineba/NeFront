import React, { useState } from "react";
import Footer from "components/Footers/Footer";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import Video from "./Video";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    fax: "",
    subject: "",
    message: "",
  });

  // Fonction de gestion des changements de valeur dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envoi des données du formulaire à l'API
      await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/contact`,
        formData
      );
      alert("votre demande à été envoyez avec succès !")
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        fax: "",
        subject: "",
        message: "",
      });
      // Gestion de la réponse réussie
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      // Gestion des erreurs
    }
  };
  const handleCancel = () => {
    // Réinitialisation des données du formulaire
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      fax: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Video />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 " xl="6">
            <Card className="card-profile shadow card-lift--hover">
              {/* <Row className="justify-content-center"></Row> */}
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="display-3 text-info">
                  Information de contact
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="justify-content-center mt-md-5">
                      <p>
                        <strong className="text-info">
                          personne a contacter :
                        </strong>{" "}
                        Laboratoire de recherche HATEM BETTAHAR{" "}
                      </p>
                      <p>
                        {" "}
                        <strong className="text-info">Adresse :</strong> Cité
                        Erriadh 6072 Zrig Gabès-Tunisie
                      </p>
                      <p>
                        {" "}
                        <strong className="text-info">Tel :</strong> Tel: +216
                        75 392 100/ +216 75 392 100
                      </p>
                      <p>
                        {" "}
                        <strong className="text-info">Fax :</strong> Tel: +216
                        75 392 100
                      </p>
                      <p>
                        {" "}
                        <strong className="text-info">Email :</strong>{" "}
                        irescomath@gmail.com
                      </p>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="6">
            <Card className="bg-secondary shadow card-lift--hover">
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="display-3 text-info">Formulaire de contact</div>
              </CardHeader>

              <CardBody>
              <Form role="form" onSubmit={handleSubmit}>
                  <div className="pl-lg-4 ">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="name">
                            Nom et Prenom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Téléphone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            name="phone"
                            type="text"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Adresse Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            name="address"
                            type="text"
                            required
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Fax
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            name="fax"
                            type="text"
                            required
                            value={formData.fax}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Sujet
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label>Message</label>
                          <Input
                            className="form-control-alternative"
                            rows="4"
                            type="textarea"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        className="mr-4"
                        color="info"
                        size="sm"
                        type="submit"
                      >
                        Valider
                      </Button>

                      <Button
                        className="mr-4"
                        color="default"
                        onClick={handleCancel}
                        size="sm"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <hr className="mt-0" />
      </Container>

      <Footer />
    </>
  );
};

export default Contact;
