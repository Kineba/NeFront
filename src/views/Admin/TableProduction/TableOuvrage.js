// import React from "react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";

import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";
import UserOuvrageForm from "views/User/UserForm/UserOuvrageForm";
import { getAllOuvrages } from "actions/allOuvrages.action";

function TableOuvrage() {
  const dispatch = useDispatch();
  const allOuvrages = useSelector((state) => state.allOuvragesReducer);
  const error = useSelector((state) => state.errorReducer.allOuvragesError);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [ouvrageId, setOuvrageId] = useState(null);

  useEffect(() => {
    dispatch(getAllOuvrages());
  }, [dispatch]);

  // useEffect(() => {
  //   if (allOuvrages.length !== 0) dispatch(getAllOuvrages());
  // }, [dispatch, allOuvrages.length]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      // console.log("Ouvrage supprimée avec succès !");
      dispatch(getAllOuvrages());
    } catch (error) {
      console.log("Erreur lors de la suppression de l'ouvrage :", error);
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedOuvrage = allOuvrages.find((ouvrage) => ouvrage._id === id);
    if (selectedOuvrage) {
      setFormData({
        ...formData,
        title: selectedOuvrage.title,
        year: selectedOuvrage.year,
        // file: selectedOuvrage.file,
        authorType: selectedOuvrage.authorType,
        cin: selectedOuvrage.cin,
        order: selectedOuvrage.order,
        publisher: selectedOuvrage.publisher,
        linkPublisher: selectedOuvrage.linkPublisher,
        edition: selectedOuvrage.edition,
        isbnIssn: selectedOuvrage.isbnIssn,
        date: selectedOuvrage.date,
      });
      setOuvrageId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setOuvrageId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet ouvrage scientifique ?"
      )
    ) {
      handleDelete(id);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <>
      {showForm ? (
        <UserOuvrageForm ouvrageId={ouvrageId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Ouvrages Scientifiques</h3>
            <div className="text-center">
              <Button onClick={handleAdd} color="info">
                Ajouter
              </Button>
            </div>
          </CardHeader>
          {/* Table Ouvrages Scientifiques */}
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
                <th scope="col">Isbn/Issn</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allOuvrages) &&
                allOuvrages.map((ouvrage, index) => (
                  <tr key={index}>
                    <td>{ouvrage.title}</td>
                    <td>{ouvrage.year}</td>
                    <td>{ouvrage.authorType}</td>
                    <td>{ouvrage.cin}</td>
                    <td>
                      {ouvrage.authors.map((author, index) => (
                        <div key={index}>
                          <span>{author.order}</span> -{" "}
                          <span>{author.firstNameLastName}</span>
                        </div>
                      ))}
                    </td>
                    <td>{ouvrage.publisher}</td>
                    <td>
                      <td>
                        <a
                          href={ouvrage.linkPublisher}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ouvrage.linkPublisher}
                        </a>
                      </td>
                    </td>
                    <td>{ouvrage.edition}</td>
                    <td>{ouvrage.isbnIssn}</td>
                    <td>{formatDate(ouvrage.date)}</td>

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
                            onClick={(e) => handleModify(e, ouvrage._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, ouvrage._id)}
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
            <h2>{error.ouvrageIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableOuvrage;
