import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getArticles } from "actions/articles.action";
import { useDispatch } from "react-redux";
import { getAllArticles } from "actions/allArticles.action";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardBody,
} from "reactstrap";

function UserArticleForm({ articleId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userArticles = useSelector((state) => state.articlesReducer);
  const allArticles = useSelector((state) => state.allArticlesReducer);
  const [formData, setFormData] = useState({
    type: "article",
    year: "",
    title: "",
    linkDOI: "",
    file: null,
    publicationDate: "",
    authorType: "interne",
    cin: "",
    journalTitle: "",
    quartile: "",
    volume: "",
    factor: "",
    indexation: "",
    journalWebsite: "",
    user_email: userData.email,
  });

  const [authors, setAuthors] = useState([{ order: 1, firstNameLastName: "" }]);

  const handleCancel = () => {
    setFormData({
      year: "",
      title: "",
      linkDOI: "",
      file: null,
      publicationDate: "",
      authorType: "",
      cin: "",
      journalTitle: "",
      quartile: "",
      volume: "",
      factor: "",
      indexation: "",
      journalWebsite: "",
    });
    setAuthors([{ order: 1, firstNameLastName: "" }]);
    setShowForm(false);
  };

  const predefinedAuthors = [
    "KHALIFA DABBEK",
    "FEDOUA BENABID",
    "HAIFA TOUATI",
    "HOUCIN TOMBARI",
    "NAJOUA BENNAJI",
    "SALAH ZIDI",
    "MOHAMED ABID",
    "AHMED ABOUD",
    "BECHIR ALAYA",
    "IKBEL AZAIEZ",
    "MOHAMED BELHASSEN",
    "HACEN BEN ABDALLAH",
    "EYA BEN CHARRADA",
    "CHAKER BEN MAHMOUD",
    "HAFEDH BEN ZINA",
    "MBAREK CHARHAD",
    "NASREDDINE HAJLAOUI",
    "KHALED HASSINE",
    "JAWHAR HBIL",
    "ISSAM JABRI",
    "KAOUTHER MANSOUR",
    "ABIR MCHERGUI",
    "FETHI MGUIS",
    "TAREK MOULAHI",
    "FATMA SOMAA",
    "NADIA SRAIEB",
    "MOUNIRA TARHOUNI",
    "MOHAMED ZAWAY",
    "AMOR HAMMAMI",
    "AMINE LAMINE",
    "SARRA JEBRI",
    "ARIJ BEN AMOR",
    "AMIRA CHRIKI",
    "JOHN DOE",
    "JANE SMITH",
  ];

  const staticCinList = ["cin1", "cin2", "cin3", "cin4"];

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
        alert("La taille du fichier ne doit pas dépasser 1Mo.");
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

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target;
    const newAuthors = [...authors];
    newAuthors[index] = {
      ...newAuthors[index],
      [name]: value,
    };
    setAuthors(newAuthors);
  };

  const handleAddAuthor = () => {
    setAuthors([
      ...authors,
      { order: authors.length + 1, firstNameLastName: "" },
    ]);
  };

  const handleRemoveAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   if (userArticles.length === 0) {
  //     dispatch(getArticles(userData.email));
  //   }
  // }, [userArticles, dispatch, userData.email]);

  // useEffect(() => {
  //   if (allArticles.length === 0) {
  //     dispatch(getAllArticles());
  //   }
  // }, [allArticles, dispatch]);

  useEffect(() => {
    if (articleId && Array.isArray(userArticles)) {
      const articleToEdit = userArticles.find(
        (article) => article._id === articleId
      );
      if (articleToEdit) {
        setFormData({ ...articleToEdit, file: null });
        if (articleToEdit.authors) {
          setAuthors(articleToEdit.authors);
        }
      }
    }
  }, [articleId, userArticles]);

  useEffect(() => {
    if (articleId && Array.isArray(allArticles)) {
      const articleToEdit = allArticles.find(
        (article) => article._id === articleId
      );
      if (articleToEdit) {
        setFormData({ ...articleToEdit, file: null });
        if (articleToEdit.authors) {
          setAuthors(articleToEdit.authors);
        }
      }
    }
  }, [articleId, allArticles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".text-center.text-danger");
    titleError.innerHTML = "";

    const {
      type,
      year,
      title,
      linkDOI,
      file,
      publicationDate,
      authorType,
      cin,
      journalTitle,
      quartile,
      volume,
      factor,
      indexation,
      journalWebsite,
      user_email,
    } = formData;

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("type", type);
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("year", year);
    formDataToSubmit.append("linkDOI", linkDOI);
    formDataToSubmit.append("publicationDate", publicationDate);
    formDataToSubmit.append("authorType", authorType);
    formDataToSubmit.append("cin", cin);
    formDataToSubmit.append("journalTitle", journalTitle);
    formDataToSubmit.append("quartile", quartile);
    formDataToSubmit.append("volume", volume);
    formDataToSubmit.append("factor", factor);
    formDataToSubmit.append("indexation", indexation);
    formDataToSubmit.append("journalWebsite", journalWebsite);
    formDataToSubmit.append("user_email", user_email);

    const authorsData = authors.map((author, index) => ({
      order: author.order,
      firstNameLastName: author.firstNameLastName,
    }));

    formDataToSubmit.append("authors", JSON.stringify(authorsData));

    if (file) {
      formDataToSubmit.append("file", file);
    }

    try {
      let response;
      if (articleId) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${articleId}`,
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/article`,
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
        dispatch(getArticles(userData.email));
        if (userData.isAdmin === true) {
          dispatch(getAllArticles());
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
      <Form onSubmit={handleSubmit} className="article-form">
        <div className="pl-lg-4">
          <Row>
            <CardBody>
              <h1 className="heading-section text-info mb-4">
                Article scientifique
              </h1>
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
                <div className="text-center text-danger "></div>
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
                  <Label className="form-control-label" htmlFor="linkDOI">
                    Lien DOI de l'article scientifique:
                  </Label>
                  <Input
                    type="text"
                    id="linkDOI"
                    placeholder="Lien DOI"
                    className="form-control-alternative"
                    name="linkDOI"
                    value={formData.linkDOI}
                    onChange={handleChange}
                  />
                </FormGroup>
                {articleId && (
                  <FormGroup>
                    <Label htmlFor="currentFile">Fichier actuel :</Label>
                    <a
                      href={`${process.env.REACT_APP_API_URL}api/user/download/production/${articleId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir le fichier PDF actuel
                    </a>
                  </FormGroup>
                )}
                <FormGroup>
                  <Label className="form-control-label" htmlFor="file">
                    Fichier (PDF, taille maximale 1 Mo){" "}
                    <span className="required"> *</span> :<br />
                    <br />
                    <Input
                      type="file"
                      id="file"
                      className="form-control-alternative"
                      name="file"
                      accept="application/pdf"
                      onChange={handleChange}
                      required={!articleId} //Rendre obligatoire seulement pour la création
                    />
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="publicationDate"
                  >
                    Date de publication
                    <span className="required"> *</span> :
                  </Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    className="form-control-alternative"
                    name="publicationDate"
                    value={
                      formData.publicationDate
                        ? formData.publicationDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <h3 className="partie">Auteur(s)</h3>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="authorType">
                    <h4>Auteur n°1</h4>
                    Type d'auteur <span className="required"> *</span>:
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          id="authorType"
                          className="form-control-alternative"
                          name="authorType"
                          value="interne"
                          checked={formData.authorType === "interne"}
                          onChange={handleChange}
                          required
                        />{" "}
                        Interne <span className="required">*</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check className="form-control-label">
                        <Input
                          type="radio"
                          className="form-control-alternative"
                          name="authorType"
                          value="externe"
                          checked={formData.authorType === "externe"}
                          onChange={handleChange}
                          required
                        />{" "}
                        Externe<span className="required"> *</span>
                      </Label>
                    </FormGroup>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="cin">
                    CIN <span className="required"> *</span> :
                  </Label>
                  {(userData.isAdmin || userData.isSecretaire) ? (
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

                <Row>
                  <Col md="12">
                    <h5>Auteurs</h5>
                    {authors.map((author, index) => (
                      <Row key={index}>
                        <Col md="4">
                          <FormGroup>
                            <Label for={`firstNameLastName-${index}`}>
                              Nom et prénom de l'auteur
                            </Label>
                            <Input
                              type="select"
                              name="firstNameLastName"
                              id={`firstNameLastName-${index}`}
                              value={author.firstNameLastName}
                              onChange={(e) => handleAuthorChange(index, e)}
                              required
                            >
                              <option value="">Sélectionner un auteur</option>
                              {predefinedAuthors.map((authorName, idx) => (
                                <option key={idx} value={authorName}>
                                  {authorName}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="2">
                          <FormGroup>
                            <Label for={`order-${index}`}>Ordre</Label>
                            <Input
                              type="number"
                              name="order"
                              id={`order-${index}`}
                              value={author.order}
                              onChange={(e) => handleAuthorChange(index, e)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="2">
                          <Button
                            color="danger"
                            onClick={() => handleRemoveAuthor(index)}
                            disabled={authors.length === 1}
                          >
                            Supprimer
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Button color="info" onClick={handleAddAuthor}>
                      Ajouter un Auteur
                    </Button>
                  </Col>
                </Row>

                <h3 className="partie">Informations journal </h3>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="journalTitle">
                    Titre du journal <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="journalTitle"
                    className="form-control-alternative"
                    name="journalTitle"
                    placeholder="Titre du journal"
                    value={formData.journalTitle}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label htmlFor="quartile">Quartile du journal:</Label>
                  <Input
                    type="select"
                    id="quartile"
                    className="form-control-alternative"
                    name="quartile"
                    value={formData.quartile}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner le quartile</option>
                    <option value="Q1 = 25%">Q1 = 25%</option>
                    <option value="Q2 = 50%">Q2 = 50%</option>
                    <option value="Q3 = 75%">Q3 = 75%</option>
                    <option value="Q4 = 100%">Q4 = 100%</option>
                    <option value="autre">autre</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="volume">
                    Volume :
                  </Label>
                  <Input
                    type="text"
                    id="volume"
                    className="form-control-alternative"
                    name="volume"
                    placeholder="Volume"
                    value={formData.volume}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="factor">Facteur d'impact :</Label>
                  <Input
                    type="Number"
                    step={0.001}
                    id="factor"
                    className="form-control-alternative"
                    name="factor"
                    placeholder="Facteur d'impact"
                    value={formData.factor}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="indexation">
                    Indexation <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="indexation"
                    className="form-control-alternative"
                    name="indexation"
                    value={formData.indexation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner l'indexation</option>
                    <option value="WOS">WOS</option>
                    <option value="SCOPUS">SCOPUS</option>
                    <option value="HIJ">HIJ</option>
                    <option value="KLM">KLM</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="journalWebsite"
                  >
                    Site de la revue:
                  </Label>
                  <Input
                    type="text"
                    id="journalWebsite"
                    className="form-control-alternative"
                    name="journalWebsite"
                    placeholder="Site de la revue"
                    value={formData.journalWebsite}
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

export default UserArticleForm;
