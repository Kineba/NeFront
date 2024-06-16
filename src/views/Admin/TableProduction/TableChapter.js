// import React from "react";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllChapters } from "actions/allChapters.action";
import UserChapterForm from "views/User/UserForm/UserChapterForm";
import axios from "axios";
import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableChapter() {
  const error = useSelector((state) => state.errorReducer.allChaptersError);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const allChapters = useSelector((state) => state.allChaptersReducer);
  const [chapterId, setChapterId] = useState(null);

  // useEffect(() => {
  //   if (allChapters.length !== 0) dispatch(getAllChapters());
  // }, [dispatch, allChapters.length]);
  useEffect(() => {
    dispatch(getAllChapters());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Chapitre d'ouvrage supprimée avec succès !");
      dispatch(getAllChapters());
    } catch (error) {
      console.log(
        "Erreur lors de la suppression du chapitre d'ouvrage :",
        error
      );
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedChapter = allChapters.find((chapter) => chapter._id === id);
    if (selectedChapter) {
      setFormData({
        ...formData,
        title: selectedChapter.title,
        year: selectedChapter.year,
        authorType: selectedChapter.authorType,
        cin: selectedChapter.cin,
        order: selectedChapter.order,
        publisher: selectedChapter.publisher,
        linkPublisher: selectedChapter.linkPublisher,
        edition: selectedChapter.edition,
        isbnIssn: selectedChapter.isbnIssn,
        date: selectedChapter.date,
      });
      setChapterId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setChapterId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // const handleCancelEdit = () => {
  //   setHabilitationId(null);
  //   setShowForm(false);
  // };

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
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce chapitre scientifique ?"
      )
    ) {
      handleDelete(id);
    }
  };
  return (
    <>
      {showForm ? (
        <UserChapterForm chapterId={chapterId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Chapitres d'ouvrages</h3>
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
                <th scope="col">Auteur</th>
                <th scope="col">Cin</th>
                <th scope="col">Ordre-Auteur</th>
                <th scope="col">éditeur</th>
                <th scope="col">Lien éditeur</th>
                <th scope="col">édition</th>
                <th scope="col">ISBN/Issn</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allChapters) &&
                allChapters.map((chapter, index) => (
                  <tr key={index}>
                    <td>{chapter.title}</td>
                    <td>{chapter.year}</td>
                    <td>{chapter.authorType}</td>
                    <td>{chapter.cin}</td>
                    <td>
                      {chapter.authors.map((author, index) => (
                        <div key={index}>
                          <span>{author.order}</span> -{" "}
                          <span>{author.firstNameLastName}</span>
                        </div>
                      ))}
                    </td>
                    <td>{chapter.publisher}</td>
                    <td>
                      <a
                        href={chapter.linkPublisher}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {chapter.linkPublisher}
                      </a>
                    </td>
                    <td>{chapter.edition}</td>
                    <td>{chapter.isbnIssn}</td>
                    <td>{formatDate(chapter.date)}</td>

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
                            onClick={(e) => handleModify(e, chapter._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, chapter._id)}
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
            <h2>{error.chapterIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableChapter;
