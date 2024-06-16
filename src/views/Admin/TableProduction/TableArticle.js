import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UserArticleForm from "views/User/UserForm/UserArticleForm";
import { getAllArticles } from "actions/allArticles.action";

import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableArticle() {
  const dispatch = useDispatch();
  const allArticles = useSelector((state) => state.allArticlesReducer);
  const error = useSelector((state) => state.errorReducer.allArticlesError);
  const [formData, setFormData] = useState({});

  const [showForm, setShowForm] = useState(false);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);
  // useEffect(() => {
  //   if (allArticles.length !== 0) dispatch(getAllArticles());
  // }, [dispatch, allArticles.length]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      dispatch(getAllArticles());
    } catch (error) {
      console.log("Erreur lors de la suppression de l'article :", error);
    }
  };
  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedArticle = allArticles.find((article) => article._id === id);
    if (selectedArticle) {
      setFormData({
        ...formData,
        title: selectedArticle.title,
        year: selectedArticle.year,
        linkDOI: selectedArticle.linkDOI,
        // file: selectedArticle.file,
        publicationDate: selectedArticle.publicationDate,
        authorType: selectedArticle.authorType,
        cin: selectedArticle.cin,
        order: selectedArticle.order,
        journalTitle: selectedArticle.journalTitle,
        quartile: selectedArticle.quartile,
        volume: selectedArticle.volume,
        factor: selectedArticle.factor,
        indexation: selectedArticle.indexation,
        journalWebsite: selectedArticle.journalWebsite,
      });
      setArticleId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setArticleId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  const formatDate = (isoDate) => {
    if (!isoDate) {
      return "";
    }
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      handleDelete(id);
    }
  };
  return (
    <>
      {showForm ? (
        <UserArticleForm articleId={articleId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="heading-section text-info mb-0">Article Scientifique</h3>
            <div className="text-center">
              <Button onClick={handleAdd} color="info">
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <Table
            className="align-items-center table-dark table-flush"
            responsive
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Année</th>
                <th scope="col">Lien DOI de l'article scientifique</th>
                <th scope="col">Fichier PDF</th>
                <th scope="col">Date de publication</th>
                <th scope="col">Type auteur</th>
                <th scope="col">Cin</th>
                <th scope="col">Ordre-Auteur</th>
                <th scope="col">Titre du journal</th>
                <th scope="col">Quartile du journal</th>
                <th scope="col">Volume</th>
                <th scope="col">Facteur d'impact</th>
                <th scope="col">Indexation</th>
                <th scope="col">Site de la revue</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allArticles) &&
                allArticles.map((article, index) => (
                  <tr key={index}>
                    <td>{article.title}</td>
                    <td>{article.year}</td>
                    <td>
                      <a
                        href={article.linkDOI}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.linkDOI}
                      </a>
                    </td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_URL}api/user/download/production/${article._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        fichier PDF
                      </a>
                    </td>
                    <td>{formatDate(article.publicationDate)}</td>
                    <td>{article.authorType}</td>
                    <td>{article.cin}</td>
                    <td>
                      {article.authors.map((author, index) => (
                        <div key={index}>
                          <span>{author.order}</span> -{" "}
                          <span>{author.firstNameLastName}</span>
                        </div>
                      ))}
                    </td>
                    <td>{article.journalTitle}</td>
                    <td>{article.quartile}</td>
                    <td>{article.volume}</td>
                    <td>{article.factor}</td>
                    <td>{article.indexation}</td>
                    <td>
                      <a
                        href={article.journalWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.journalWebsite}
                      </a>
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
                        <DropdownMenu className="dropdown-menu-arrow" positionFixed>
                          <DropdownItem
                            onClick={(e) => handleModify(e, article._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, article._id)}
                          >
                            Supprimer
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Annuler
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="text-center text-dark">
            {" "}
            <h2>{error.articleIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default TableArticle;
