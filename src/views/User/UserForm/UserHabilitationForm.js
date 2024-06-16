import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getHabilitations } from "actions/habilitations.action";
import { getAllHabilitations } from "actions/allHabilitations.action";
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

function UserHabilitationForm({ habilitationId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userHabilitations = useSelector((state) => state.habilitationsReducer);
  const allHabilitations = useSelector(
    (state) => state.allHabilitationsReducer
  );

  const staticCinList = ["cin1", "cin2", "cin3", "cin4"];

  const [formData, setFormData] = useState({
    // type: "habilitation",
    title: "",
    year: "",
    titulaire: "",
    cin: "",
    file: null,
    date: "",
    user_email: userData.email,
  });

  const handleCancel = () => {
    setFormData({
      title: "",
      year: "",
      titulaire: "",
      cin: "",
      file: null,
      date: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 1 Mo en octets
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le fichier doit être au format PDF.");
        return;
      }
      if (file.size > maxSize) {
        e.target.value = null;
        alert("La taille du fichier ne doit pas dépasser 2Mo.");
        return;
      }
      // Mettre à jour l'état avec le fichier réel
      setFormData({
        ...formData,
        [name]: file, // Mettre à jour avec le fichier réel
      });
    } else {
      // Pour les autres champs, mettre à jour avec la valeur
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // useEffect(() => {
  //   if (userHabilitations.length === 0) {
  //     dispatch(getHabilitations(userData.email));
  //   }
  // }, [userHabilitations, dispatch, userData.email]);

  // useEffect(() => {
  //   if (allHabilitations.length === 0) {
  //     dispatch(getAllHabilitations());
  //   }
  // }, [allHabilitations, dispatch]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (habilitationId && Array.isArray(userHabilitations)) {
      const habilitationToEdit = userHabilitations.find(
        (habilitation) => habilitation._id === habilitationId
      );
      if (habilitationToEdit) {
        setFormData({ ...habilitationToEdit, file: null });
      }
    }
  }, [habilitationId, userHabilitations]);
  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (habilitationId && Array.isArray(allHabilitations)) {
      const habilitationToEdit = allHabilitations.find(
        (habilitation) => habilitation._id === habilitationId
      );
      if (habilitationToEdit) {
        setFormData({ ...habilitationToEdit, file: null });
      }
    }
  }, [habilitationId, allHabilitations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".text-center.text-danger");
    titleError.innerHTML = "";

    // Utilisez formData pour stocker les valeurs du formulaire
    const { title, year, titulaire, cin, date, file, user_email } = formData;

    // Créer un objet FormData
    const formDataToSubmit = new FormData();
    // Ajouter les données du formulaire

    formDataToSubmit.append("type", "habilitation");
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("year", year);
    formDataToSubmit.append("titulaire", titulaire);
    formDataToSubmit.append("cin", cin);
    formDataToSubmit.append("date", date);
    formDataToSubmit.append("user_email", user_email);
    // Ajouter le fichier
    if (file) {
      formDataToSubmit.append("file", file);
    }
    try {
      let response;
      if (habilitationId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${habilitationId}`,
          formDataToSubmit, // Utiliser formDataToSubmit pour l'upload de fichier
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/habilitation`,
          formDataToSubmit, // Utiliser formDataToSubmit pour l'upload de fichier
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.errors && response.data.errors.uniqueTitle) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getHabilitations(userData.email));
        if (userData.isAdmin === true) {
          dispatch(getAllHabilitations());
        }
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
        <Row>
          <CardBody>
            <h1 className="heading-section text-info mb-4">Habilitation</h1>
            <div className="pl-lg-4">
              <FormGroup>
                <Label htmlFor="year">
                  Année <span className="required">*</span>:
                </Label>
                <Input
                  type="select"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner une année</option>
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
                <label className="form-control-label" htmlFor="titulaire">
                  Nom et prénom titulaire habilitation
                  <span className="required"> *</span>
                </label>
                <Input
                  className="form-control-alternative"
                  type="text"
                  name="titulaire"
                  id="titulaire"
                  placeholder="Nom et prénom"
                  value={formData.titulaire}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              {/* <FormGroup>
                  <Label className="form-control-label" htmlFor="cin">
                    CIN <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="cin"
                    className="form-control-alternative"
                    name="cin"
                    placeholder="Cin"
                    value={formData.cin}
                    onChange={handleChange}
                    required
                  />
                </FormGroup> */}

              <FormGroup>
                <Label className="form-control-label" htmlFor="cin">
                  CIN <span className="required"> *</span> :
                </Label>
                {userData.isAdmin ? (
                  <Input
                    type="select"
                    id="cin"
                    className="form-control-alternative"
                    name="cin"
                    value={formData.cin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un CIN</option>
                    {staticCinList.map((cin) => (
                      <option key={cin} value={cin}>
                        {cin}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    type="text"
                    id="cin"
                    className="form-control-alternative"
                    name="cin"
                    placeholder="Cin"
                    value={formData.cin}
                    onChange={handleChange}
                    required
                  />
                )}
              </FormGroup>
              {habilitationId && (
                <FormGroup>
                  <Label htmlFor="currentFile">Fichier actuel :</Label>
                  <a
                    href={`${process.env.REACT_APP_API_URL}api/user/download/production/${habilitationId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le fichier PDF actuel
                  </a>
                </FormGroup>
              )}
              <FormGroup>
                <Label className="form-control-label" htmlFor="file">
                  Fichier PDF(version reduite: page de garde plus introduction
                  plus Tables des matières plus conclusion générale) (PDF,
                  taille maximale 2MO) <span className="required"> *</span> :{" "}
                  <br />
                  <br />
                  <Input
                    type="file"
                    id="file"
                    className="form-control-alternative"
                    name="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    required={!habilitationId}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="date">
                  Date <span className="required">*</span> :
                </Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date ? formData.date.split("T")[0] : ""}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div className="text-center">
                <Button type="submit" className="mt-4">
                  Valider
                </Button>
                <Button type="button" className="mt-4" onClick={handleCancel}>
                  Annuler
                </Button>
              </div>
            </div>
          </CardBody>
        </Row>
      </Form>
    </>
  );
}

export default UserHabilitationForm;
