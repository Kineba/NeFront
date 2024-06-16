import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getProjets } from "actions/projet.action";
import { useDispatch } from "react-redux";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CardBody,
} from "reactstrap";

function AdminProjetForm({ projetId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const adminProjets = useSelector((state) => state.projetsReducer);


  const [formData, setFormData] = useState({
    type: "projet",
    adminEmail: userData.email,
    year: "",
    code: "",
    category: "",
    type1: "",
    intituled: "",
    coordProjet: "",
    partProjet: "",
    title:""
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      code: "",
      category: "",
      type1: "",
      intituled: "",
      coordProjet: "",
      partProjet: "",
      title:""
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
  //   if (adminProjets.length === 0) {
  //     dispatch(getProjets());
  //     // console.log(userData.email)
  //   }
  // }, [adminProjets, dispatch]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (projetId && Array.isArray(adminProjets)) {
      const projetToEdit = adminProjets.find(
        (projet) => projet._id === projetId
      );
      if (projetToEdit) {
        setFormData({ ...projetToEdit });
      }
    }
  }, [projetId, adminProjets]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".text-center.text-dark");
    titleError.innerHTML = "";

    try {
      let response;
      if (projetId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/evenement/${projetId}`,
          {
            year: formData.year,
            code: formData.code,
            category: formData.category,
            type1: formData.type1,
            intituled: formData.intituled,
            coordProjet: formData.coordProjet,
            partProjet: formData.partProjet,
            title: formData.title
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/projet`,
          {
            type: "projet",
            adminEmail: userData.email,
            year: formData.year,
            code: formData.code,
            category: formData.category,
            type1: formData.type1,
            intituled: formData.intituled,
            coordProjet: formData.coordProjet,
            partProjet: formData.partProjet,
            title: formData.title
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getProjets());
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
            <h1 className="heading-section text-info mb-4">Projet</h1>
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
                    // className="form-control-alternative"
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
                  <Label className="form-control-label" htmlFor="code">
                    Code <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="code"
                    className="form-control-alternative"
                    name="code"
                    placeholder="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="category">
                    Catégorie <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="category"
                    // className="form-control-alternative"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner la Catégorie</option>
                    <option value="Projets nationaux">Projets nationaux</option>
                    <option value="Projets bilatéraux">Projets bilatéraux</option>
                    <option value="Projets multilatésraux">Projets multilatésraux</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="type1">
                    Type <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="type1"
                    className="form-control-alternative"
                    name="type1"
                    value={formData.type1}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner la Catégorie</option>
                    <option value="PRF"> PRF</option>
                    <option value="PEES">PEES</option>
                    <option value="PAQ PAES">PAQ PAES</option>
                    <option value="tuniso-algérien">tuniso-algérien</option>
                    <option value="tuniso-marocain">tuniso-marocain</option>
                    <option value="tunisie-Afrique du Sud">tunisie-Afrique du Sud</option>
                    <option value="PHC-Utique">PHC-Utique</option>
                    <option value="PHC-Maghreb">PHC-Maghreb</option>
                    <option value="type( PRIMA, Eranet,...)">type( PRIMA, Eranet,...)</option>
                    <option value="PEJC">PEJC</option>
                    <option value="autre">autre</option>
                    <option value="autre">autre</option>
                    <option value="autre">autre</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="intituled">
                    Intitulé<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="intituled"
                    className="form-control-alternative"
                    name="intituled"
                    value={formData.intituled}
                    onChange={handleChange}
                    placeholder="Intitulé"
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="coordProjet">
                    Coordinateur du projet <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="coordProjet"
                    className="form-control-alternative"
                    name="coordProjet"
                    placeholder="Coordinateur du projet"
                    value={formData.coordProjet}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label className="form-control-label" htmlFor="partProjet">
                    Part du budget:
                  </Label>
                  <Input
                    type="text"
                    id="partProjet"
                    className="form-control-alternative"
                    name="partProjet"
                    placeholder="Budget"
                    value={formData.partProjet}
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

export default AdminProjetForm;