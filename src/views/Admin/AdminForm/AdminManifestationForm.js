import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getManifestations } from "actions/manifestation.action";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CardBody,
} from "reactstrap";

function AdminManifestationForm({ manifestationId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const adminManifestations = useSelector(
    (state) => state.manifestationsReducer
  );
  //   const adminProjets = useSelector((state) => state.articlesReducer);

  const [formData, setFormData] = useState({
    type: "manifestation",
    year: "",
    title: "",
    organizers: "",
    dateOfOrganization: "",
    location: "",
    type2: "",
    webSite: "",
    adminEmail: userData.email,
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      title: "",
      organizers: "",
      dateOfOrganization: "",
      location: "",
      type2: "",
      webSite: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (adminManifestations.length === 0) {
  //     dispatch(getManifestations());
  //   }
  // }, [adminManifestations, dispatch]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (manifestationId && Array.isArray(adminManifestations)) {
      const manifestationToEdit = adminManifestations.find(
        (manifestation) => manifestation._id === manifestationId
      );
      if (manifestationToEdit) {
        setFormData({ ...manifestationToEdit });
      }
    }
  }, [manifestationId, adminManifestations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".text-center.text-dark");
    titleError.innerHTML = "";

    try {
      let response;
      if (manifestationId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/evenement/${manifestationId}`,
          {
            year: formData.year,
            title: formData.title,
            organizers: formData.organizers,
            dateOfOrganization: formData.dateOfOrganization,
            location: formData.location,
            type2: formData.type2,
            webSite: formData.webSite,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/manifestation`,
          {
            type: "manifestation",
            adminEmail: userData.email,
            year: formData.year,
            title: formData.title,
            organizers: formData.organizers,
            dateOfOrganization: formData.dateOfOrganization,
            location: formData.location,
            type2: formData.type2,
            webSite: formData.webSite,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getManifestations());
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du manifestation :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <div className="pl-lg-4">
          <Row>
            <CardBody>
            <h1 className="heading-section text-info mb-4">Manifestation</h1>
              <div className="pl-lg-4">
                <FormGroup>
                  <label className="form-control-label" htmlFor="title">
                    Titre
                    <span className="required"> *</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titre"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <div className="text-center text-dark"></div>
                <FormGroup>
                  <label className="form-control-label" htmlFor="year">
                    Année
                    <span className="required"> *</span>
                  </label>
                  <Input
                    type="select"
                    name="year"
                    id="year"
                    className="form-control-alternative"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selectionner une année</option>
                    {Array.from(
                      { length: 2026 - 2000 },
                      (_, index) => 2000 + index
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="organizers">
                    Organisateurs <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="organizers"
                    className="form-control-alternative"
                    name="organizers"
                    placeholder="Organisateurs"
                    value={formData.organizers}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="dateOfOrganization"
                  >
                    Date organisation <span className="required"> *</span> :
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="dateOfOrganization"
                    name="dateOfOrganization"
                    type="date"
                    value={
                      formData.dateOfOrganization
                        ? formData.dateOfOrganization.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="location">
                    Lieu<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    className="form-control-alternative"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Lieu"
                    min="0"
                    required
                  />
                </FormGroup>

                <Label className="form-control-label" htmlFor="type2">
                  Type <span className="required"> *</span>:<br />
                </Label>
                <Col lg="2">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        id="type2"
                        className="form-control-alternative"
                        name="type2"
                        value="national"
                        checked={formData.type2 === "national"}
                        onChange={handleChange}
                        required
                      />{" "}
                      National <span className="required"> *</span> :
                    </Label>
                  </FormGroup>
                </Col>
                <Col lg="2">
                  <FormGroup check>
                    <Label check className="form-control-label">
                      <Input
                        type="radio"
                        id="type2"
                        className="form-control-alternative"
                        name="type2"
                        value="international"
                        checked={formData.type2 === "international"}
                        onChange={handleChange}
                        required
                      />{" "}
                      International <span className="required"> *</span> :
                    </Label>
                  </FormGroup>
                </Col>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="webSite">
                    Site Web :
                  </Label>
                  <Input
                    type="text"
                    id="webSite"
                    className="form-control-alternative"
                    name="webSite"
                    placeholder="site Web"
                    value={formData.webSite}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="text-center">
                <Button type="submit" className="mt-4">
                  Valider
                </Button>
                <Button type="button" className="mt-4" onClick={handleCancel}>
                  Annuler
                </Button>
              </div>
            </CardBody>
          </Row>
        </div>
      </Form>
    </>
  );
}

export default AdminManifestationForm;
