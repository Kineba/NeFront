import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getMasters } from "actions/masters.action";
import { getAllMasters } from "actions/allMasters.action";
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

function UserMasterForm({ masterId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userMasters = useSelector((state) => state.mastersReducer);
  const allMasters = useSelector((state) => state.allMastersReducer);

  const [formData, setFormData] = useState({
    // type: "master",
    title: "",
    year: "",
    firstNameLastName: "",
    yearOfFirstRegistration: "",
    file: null,
    subject: "",
    supervisor: "",
    user_email: userData.email,
    user_id: userData._id,
  });

  const staticCinList = ["cin1", "cin2", "cin3", "cin4"];

  const handleCancel = () => {
    setFormData({
      // type: "master",
      title: "",
      year: "",
      firstNameLastName: "",
      yearOfFirstRegistration: "",
      file: null,
      subject: "",
      supervisor: "",
    });
    setShowForm(false);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le fichier doit être au format PDF.");
        return;
      }
      if (file.size > maxSize) {
        e.target.value = null;
        alert("La taille du fichier ne doit pas dépasser 1 Mo.");
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

  useEffect(() => {
    if (userMasters.length === 0) {
      dispatch(getMasters(userData.email));
    }
  }, [userMasters, dispatch, userData.email]);

  useEffect(() => {
    if (allMasters.length === 0) {
      dispatch(getAllMasters());
    }
  }, [allMasters, dispatch]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (masterId && Array.isArray(userMasters)) {
      const masterToEdit = userMasters.find(
        (master) => master._id === masterId
      );
      if (masterToEdit) {
        setFormData({ ...masterToEdit, file: null });
      }
    }
  }, [masterId, userMasters]);

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (masterId && Array.isArray(allMasters)) {
      const masterToEdit = allMasters.find((master) => master._id === masterId);
      if (masterToEdit) {
        setFormData({ ...masterToEdit, file: null });
      }
    }
  }, [masterId, allMasters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    // Utilisez formData pour stocker les valeurs du formulaire
    const {
      // type,
      title,
      year,
      cin,
      firstNameLastName,
      yearOfFirstRegistration,
      file,
      subject,
      supervisor,
      user_email,
    } = formData;

    // Créer un objet FormData
    const formDataToSubmit = new FormData();

    // Ajouter les données du formulaire
    formDataToSubmit.append("type", "master");
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("year", year);
    formDataToSubmit.append("cin", cin);
    formDataToSubmit.append("yearOfFirstRegistration", yearOfFirstRegistration);
    formDataToSubmit.append("subject", subject);
    formDataToSubmit.append("firstNameLastName", firstNameLastName);
    formDataToSubmit.append("supervisor", supervisor);
    formDataToSubmit.append("user_email", user_email);

    // Ajouter le fichier
    if (file) {
      formDataToSubmit.append("file", file);
    }
    try {
      let response;
      if (masterId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${masterId}`,
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
          `${process.env.REACT_APP_API_URL}api/user/master`,
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
        dispatch(getMasters(userData.email));
        if (userData.isAdmin === true) {
          dispatch(getAllMasters());
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
            <h1 className="heading-section text-info mb-4">Mastère</h1>
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
              <div className="title_error"></div>
              <FormGroup>
                <Label for="year">
                  Année <span className="required">*</span> :
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
                    { length: new Date().getFullYear() - 2000 + 1 },
                    (_, index) => 2000 + index
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
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
              <FormGroup>
                <Label for="firstNameLastName">
                  Nome et prénom de l'étudiant :
                </Label>
                <Input
                  type="text"
                  name="firstNameLastName"
                  id="firstNameLastName"
                  placeholder="Nome et prénom"
                  value={formData.firstNameLastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="yearOfFirstRegistration">
                  Année de prémière inscription{" "}
                  <span className="required">*</span> :
                </Label>
                <Input
                  type="number"
                  name="yearOfFirstRegistration"
                  id="yearOfFirstRegistration"
                  value={formData.yearOfFirstRegistration}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </FormGroup>
              {masterId && (
                <FormGroup>
                  <Label htmlFor="currentFile">Fichier actuel :</Label>
                  <a
                    href={`${process.env.REACT_APP_API_URL}api/user/download/production/${masterId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le fichier PDF actuel
                  </a>
                </FormGroup>
              )}
              <FormGroup>
                <Label for="file">
                  Memoire mastère (fichier PDF qui contient la page de garde et
                  la taille maximale 1 Mo ) <span className="required">*</span>:
                  <br />
                  <br />
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleChange}
                  required={!masterId}
                />
                {/* <span>No file chosen</span> */}
              </FormGroup>
              <FormGroup>
                <Label for="subject">
                  Sujet <span className="required">*</span> :
                </Label>
                <Input
                  type="textarea"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="supervisor">
                  Encadrant <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="supervisor"
                  id="supervisor"
                  placeholder="Encadrant"
                  value={formData.supervisor}
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

export default UserMasterForm;
