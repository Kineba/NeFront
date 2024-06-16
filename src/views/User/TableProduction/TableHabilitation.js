// Import des modules nécessaires depuis React et Reactstrap
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getHabilitations } from "actions/habilitations.action";
import { useDispatch } from "react-redux";
// import HabilitationForm from "../UserProductionForm/HabilitationForm";

import UserHabilitationForm from "../UserForm/UserHabilitationForm";

import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

// Composant TableHabilitation qui affiche la liste des habilitations
function TableHabilitation() {
  const dispatch = useDispatch();
  // Récupération de la liste des habilitations depuis le state Redux
  const userData = useSelector((state) => state.userReducer);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const userHabilitations = useSelector((state) => state.habilitationsReducer);
  const error = useSelector((state) => state.errorReducer.habilitationError);

  const [showForm, setShowForm] = useState(false);
  const [habilitationId, setHabilitationId] = useState(null);

  useEffect(() => {
    dispatch(getHabilitations(userData.email));
  }, [dispatch,userData.email]);

  // useEffect(() => {
  //   if (userHabilitations.length !== 0)
  //     dispatch(getHabilitations(userData.email));
  // }, [dispatch, userHabilitations.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Habilitation supprimée avec succès !");
      dispatch(getHabilitations(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression de l'habilitation :", error);
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedHabilitation = userHabilitations.find(
      (habilitation) => habilitation._id === id
    );
    if (selectedHabilitation) {
      setFormData({
        ...formData,
        title: selectedHabilitation.title,
        year: selectedHabilitation.year,
        titulaire: selectedHabilitation.titulaire,
        cin: selectedHabilitation.cin,
        date: selectedHabilitation.date,
      });
      setHabilitationId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setHabilitationId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // Fonction pour formater la date au format français
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
      window.confirm("Êtes-vous sûr de vouloir supprimer cette habilitation ?")
    ) {
      handleDelete(id);
    }
  };

  // Rendu du composant
  return (
    <>
      {showForm ? (
        <UserHabilitationForm
          habilitationId={habilitationId}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          {/* En-tête de la table */}
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Habilitation</h3>
            <div className="text-center">
              <Button onClick={(event) => handleAdd(event)} color="info">
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
                <th scope="col">Nom et prénom titulaire habilitation</th>
                <th scope="col">Cin</th>
                <th scope="col">Fichier PDF</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {/* Boucle sur la liste des habilitations pour afficher chaque ligne */}
              {Array.isArray(userHabilitations) &&
                userHabilitations.map((habilitation, index) => (
                  <tr key={index}>
                    <td>{habilitation.title}</td>
                    <td>{habilitation.year}</td>
                    <td>{habilitation.titulaire}</td>
                    <td>{habilitation.cin}</td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_URL}api/user/download/production/${habilitation._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        fichier PDF
                      </a>
                    </td>
                    <td>{formatDate(habilitation.date)}</td>

                    <td className="text-right">
                      {/* Dropdown pour les actions sur chaque habilitation */}
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
                            onClick={(e) => handleModify(e, habilitation._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, habilitation._id)}
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
          <div className="brevet_error">
            {" "}
            <h2>{error.habilitationIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default TableHabilitation;
