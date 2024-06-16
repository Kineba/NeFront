import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getChapters } from "actions/chapters.action";
import { useDispatch } from "react-redux";
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
import { getAllChapters } from "actions/allChapters.action";

function UserChapterForm({ chapterId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userChapters = useSelector((state) => state.chaptersReducer);
  const allChapters = useSelector((state) => state.allChaptersReducer);
  const [formData, setFormData] = useState({
    type: "chapter",
    year: "",
    authorType: "interne",
    cin: "",
    order: "",
    title: "",
    publisher: "",
    linkPublisher: "",
    edition: "",
    isbnIssn: "",
    date: "",
  });
  const [authors, setAuthors] = useState([{ order: 1, firstNameLastName: "" }]);
  const authorsData = authors.map((author, index) => ({
    order: author.order,
    firstNameLastName: author.firstNameLastName,
  }));

  const handleCancel = () => {
    setFormData({
      year: "",
      authorType: "",
      cin: "",
      order: "",
      title: "",
      publisher: "",
      linkPublisher: "",
      edition: "",
      isbnIssn: "",
      date: "",
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  useEffect(() => {
    if (userChapters.length === 0) {
      dispatch(getChapters(userData.email));
    }
  }, [userChapters, dispatch, userData.email]);

  useEffect(() => {
    if (allChapters.length === 0) {
      dispatch(getAllChapters());
    }
  }, [allChapters, dispatch]);
  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (chapterId && Array.isArray(userChapters)) {
      const chapterToEdit = userChapters.find(
        (chapter) => chapter._id === chapterId
      );
      if (chapterToEdit) {
        setFormData({ ...chapterToEdit });
        if (chapterToEdit.authors) {
          setAuthors(chapterToEdit.authors);
        }
      }
    }
  }, [chapterId, userChapters]);
  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (chapterId && Array.isArray(allChapters)) {
      const chapterToEdit = allChapters.find(
        (chapter) => chapter._id === chapterId
      );
      if (chapterToEdit) {
        setFormData({ ...chapterToEdit });
        if (chapterToEdit.authors) {
          setAuthors(chapterToEdit.authors);
        }
      }
    }
  }, [chapterId, allChapters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (chapterId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${chapterId}`,
          {
            year: formData.year,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            title: formData.title,

            publisher: formData.publisher,
            linkPublisher: formData.linkPublisher,
            edition: formData.edition,
            isbnIssn: formData.isbnIssn,
            date: formData.date,
            authors: JSON.stringify(authorsData),
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/chapter`,
          {
            type: formData.type,
            user_email: userData.email,
            user_id: userData._id,
            year: formData.year,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            title: formData.title,

            publisher: formData.publisher,
            linkPublisher: formData.linkPublisher,
            edition: formData.edition,
            isbnIssn: formData.isbnIssn,
            date: formData.date,
            authors: JSON.stringify(authorsData),
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getChapters(userData.email));
        if (userData.isAdmin === true) {
          dispatch(getAllChapters());
        }
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour de l'habilitation :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <Row>
          <CardBody>
            <h1 className="heading-section text-info mb-4">
              Chapitre d'Ouvrage
            </h1>
            <div className="pl-lg-4">
              <FormGroup>
                <Label htmlFor="title">
                  Titre <span className="required">*</span> :
                </Label>
                <Input
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
                <Label htmlFor="authorType">
                  Auteur <span className="required">*</span> :
                </Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="authorType"
                      value="interne"
                      id="authorType"
                      checked={formData.authorType === "interne"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Interne
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      id="authorType"
                      name="authorType"
                      value="externe"
                      checked={formData.authorType === "externe"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Externe
                  </Label>
                </FormGroup>
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

              <FormGroup>
                <Label htmlFor="publisher">
                  Editeur <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="publisher" //editeur
                  id="publisher"
                  placeholder="Editeur"
                  value={formData.publisher}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="linkPublisher">Lien éditeur :</Label>
                <Input
                  type="text"
                  name="linkPublisher" //Lien Editeur
                  id="linkPublisher"
                  placeholder="Lien éditeur"
                  value={formData.linkPublisher}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="edition">
                  Edition <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="edition"
                  id="edition"
                  placeholder="Edition"
                  value={formData.edition}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="isbnIssn">ISBN/Issn :</Label>
                <Input
                  type="text"
                  name="isbnIssn"
                  id="isbnIssn"
                  placeholder="ISBN/Issn"
                  value={formData.isbnIssn}
                  onChange={handleChange}
                />
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
      </Form>
    </>
  );
}

export default UserChapterForm;
