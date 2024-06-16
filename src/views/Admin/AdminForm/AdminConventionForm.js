import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getConventions } from "actions/convention.action";
import { useDispatch } from "react-redux";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CardBody
} from "reactstrap";

function AdminConventionForm({ conventionId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const adminConventions = useSelector((state) => state.conventionsReducer);
  
  const [formData, setFormData] = useState({
    type: "convention",
    title: "",
    year: "",
    type2: "",
    partner: "",
    type1: "",
    summary: "",
    financialImpact: "",
    environmentalImpact: "",
    creationDate: "",
    adminEmail: userData.email
  });

  const handleCancel = () => {
    setFormData({
      title: "",
      year: "",
      type2: "",
      partner: "",
      type1: "",
      summary: "",
      financialImpact: "",
      environmentalImpact: "",
      creationDate: "",
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
  //   if (adminConventions.length === 0) {
  //     dispatch(getConventions());
  //   }
  // }, [adminConventions, dispatch]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (conventionId && Array.isArray(adminConventions)) {
      const conventionToEdit = adminConventions.find(
        (convention) => convention._id === conventionId
      );
      if (conventionToEdit) {
        setFormData({ ...conventionToEdit });
      }
    }
  }, [conventionId, adminConventions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".text-center.text-danger");
    titleError.innerHTML = "";

    try {
      let response;
      if (conventionId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/evenement/${conventionId}`,
          {
            title: formData.title,
            year: formData.year,
            type2: formData.type2,
            partner: formData.partner,
            category: formData.category,
            type1: formData.type1,
            summary: formData.summary,
            financialImpact: formData.financialImpact,
            environmentalImpact: formData.environmentalImpact,
            creationDate: formData.creationDate
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/convention`,
          {
            type: "convention",
            adminEmail: userData.email,
            year: formData.year,
            type2: formData.type2,
            title: formData.title,
            partner: formData.partner,
            category: formData.category,
            type1: formData.type1,
            summary: formData.summary,
            financialImpact: formData.financialImpact,
            environmentalImpact: formData.environmentalImpact,
            creationDate: formData.creationDate,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getConventions());
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du projet :",
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
            <h1 className="heading-section text-info mb-4">Convention</h1>
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
                <div className="text-center text-danger"></div>
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
                  <Label className="form-control-label" htmlFor="type2">
                    Origine <span className="required"> *</span>:
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
                        National <span className="required">*</span>
                      </Label>
                    </FormGroup>
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
                        International<span className="required"> *</span>
                      </Label>
                    </FormGroup>
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="partner">
                    Partenaire <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="textarea"
                    id="partner"
                    className="form-control-alternative"
                    name="partner"
                    placeholder="partenaire"
                    value={formData.partner}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="type1">
                    Type <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="type1"
                    className="form-control-alternative"
                    name="type1"
                    value={formData.type1}
                    onChange={handleChange}
                    placeholder="Type"
                    min="0"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="summary">
                    Résumé<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="textarea"
                    id="summary"
                    className="form-control-alternative"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Résumé"
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="financialImpact"
                  >
                    Impact financier :
                  </Label>
                  <Input
                    type="text"
                    id="financialImpact"
                    className="form-control-alternative"
                    name="financialImpact"
                    placeholder="Impact financier"
                    value={formData.financialImpact}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="environmentalImpact"
                  >
                    Impact en nature :
                  </Label>
                  <Input
                    type="text"
                    id="environmentalImpact"
                    className="form-control-alternative"
                    name="environmentalImpact"
                    placeholder="Impact en nature"
                    value={formData.environmentalImpact}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="form-control-label" htmlFor="creationDate">
                    Date de création <span className="required"> *</span> :
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="creationDate"
                    name="creationDate"
                    type="date"
                    value={
                      formData.creationDate
                        ? formData.creationDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
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

export default AdminConventionForm;