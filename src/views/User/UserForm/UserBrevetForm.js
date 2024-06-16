// export default UserBrevetForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getBrevets } from "actions/brevets.action";
import { getAllBrevets } from "actions/allBrevets.action";
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

function UserBrevetForm({ brevetId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userBrevets = useSelector((state) => state.brevetsReducer);
  const allBrevets = useSelector((state) => state.allBrevetsReducer);
  const [formData, setFormData] = useState({
    // type: "brevet",
    title: "",
    year: "",
    reference: "",
    cin: "",
    file: null,
    creationDate: "",
    type_: "",
    user_email: userData.email,
  });

  const staticCinList = ["cin1", "cin2", "cin3", "cin4"];

  const handleCancel = () => {
    setFormData({
      title: "",
      year: "",
      reference: "",
      cin: "",
      file: null,
      creationDate: "",
      type_: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le fichier doit être au format PDF.");
        return;
      }
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (file.size > maxSize) {
        e.target.value = null;
        alert("La taille du fichier ne doit pas dépasser 1 Mo.");

        return;
      }
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // useEffect(() => {
  //   if (userBrevets.length === 0) {
  //     dispatch(getBrevets(userData.email));
  //   }
  // }, [userBrevets, dispatch, userData.email]);

  // useEffect(() => {
  //   if (allBrevets.length === 0) {
  //     dispatch(getAllBrevets());
  //   }
  // }, [allBrevets, dispatch]);

  useEffect(() => {
    if (brevetId && Array.isArray(userBrevets)) {
      const brevetToEdit = userBrevets.find(
        (brevet) => brevet._id === brevetId
      );
      if (brevetToEdit) {
        setFormData({ ...brevetToEdit, file: null }); // Ne pas pré-remplir le champ de fichier
      }
    }
  }, [brevetId, userBrevets]);

  useEffect(() => {
    if (brevetId && Array.isArray(allBrevets)) {
      const brevetToEdit = allBrevets.find((brevet) => brevet._id === brevetId);
      if (brevetToEdit) {
        setFormData({ ...brevetToEdit, file: null }); // Ne pas pré-remplir le champ de fichier
      }
    }
  }, [brevetId, allBrevets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    const {
      // type,
      title,
      year,
      reference,
      cin,
      file,
      creationDate,
      type_,
      user_email,
    } = formData;

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("type", "brevet");
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("year", year);
    formDataToSubmit.append("reference", reference);
    formDataToSubmit.append("cin", cin);
    formDataToSubmit.append("creationDate", creationDate);
    formDataToSubmit.append("type_", type_);
    formDataToSubmit.append("user_email", user_email);

    if (file) {
      formDataToSubmit.append("file", file);
    }

    try {
      let response;
      if (brevetId) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${brevetId}`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/brevet`,
          formDataToSubmit,
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
        dispatch(getBrevets(userData.email));
        if (userData.isAdmin === true) {
          dispatch(getAllBrevets());
        }
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
      <Form
        onSubmit={handleSubmit}
        className="article-form"
        encType="multipart/form-data"
      >
        <Row>
          <CardBody>
            <h1 className="heading-section text-info mb-4">Brevet</h1>
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
                <Label htmlFor="year">
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
                <Label htmlFor="reference">
                  Référence <span className="required">*</span>:
                </Label>
                <Input
                  type="textarea"
                  name="reference"
                  id="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
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
              {brevetId && (
                <FormGroup>
                  <Label htmlFor="currentFile">Fichier actuel :</Label>
                  <a
                    href={`${process.env.REACT_APP_API_URL}api/user/download/production/${brevetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le fichier PDF actuel
                  </a>
                </FormGroup>
              )}
              <FormGroup>
                <Label htmlFor="file">
                  Fichier (PDF Taille maximale 1Mo) :
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleChange}
                  required={!brevetId} // Rendre obligatoire seulement pour la création
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="creationDate">
                  Date de création <span className="required">*</span> :
                </Label>
                <Input
                  type="date"
                  name="creationDate"
                  id="creationDate"
                  value={
                    formData.creationDate
                      ? formData.creationDate.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="type_">
                  Type <span className="required">*</span>:
                </Label>
                <Input
                  type="textarea"
                  name="type_"
                  id="type_"
                  value={formData.type_}
                  onChange={handleChange}
                  required
                ></Input>
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

export default UserBrevetForm;
