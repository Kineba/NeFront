// Import des modules nécessaires depuis React et Reactstrap
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTheses } from "actions/theses.action";
import { useDispatch } from "react-redux";
import UserTheseForm from "../UserForm/UserTheseForm";
import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableThese() {
  const userTheses = useSelector((state) => state.thesesReducer);
  const dispatch = useDispatch();
  // Récupération de la liste des habilitations depuis le state Redux
  const userData = useSelector((state) => state.userReducer);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const error = useSelector((state) => state.errorReducer.theseError);
  const [showForm, setShowForm] = useState(false);
  const [theseId, setTheseId] = useState(null);

  useEffect(() => {
    dispatch(getTheses(userData.email));
  }, [dispatch,userData.email]);
  // useEffect(() => {
  //   if (userTheses.length !== 0) dispatch(getTheses(userData.email));
  // }, [dispatch, userTheses.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Thèse supprimée avec succès !");
      dispatch(getTheses(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du thèse :", error);
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedThese = userTheses.find(
      (habilitation) => habilitation._id === id
    );
    if (selectedThese) {
      setFormData({
        ...formData,
        title: selectedThese.title,
        year: selectedThese.year,
        yearOfFirstRegistration: selectedThese.yearOfFirstRegistration,
        subject: selectedThese.subject,
        cin: selectedThese.cin,
        supervisor: selectedThese.supervisor,
        // file: selectedThese.file,
        cotutelle: selectedThese.cotutelle,
      });
      setTheseId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTheseId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette thèse ?")) {
      handleDelete(id);
    }
  };

  return (
    <>
      {showForm ? (
        <UserTheseForm theseId={theseId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Thèses</h3>
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
                <th scope="col">Année de prémière inscription</th>
                <th scope="col">Cin </th>
                <th scope="col">Sujet </th>
                <th scope="col">Encadrant</th>
                <th scope="col">Code Structure </th>
                <th scope="col">File </th>
                <th scope="col">Cotutelle</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userTheses) &&
                userTheses.map((these, index) => (
                  <tr key={index}>
                    <td>{these.title}</td>
                    <td>{these.year}</td>
                    <td>{these.yearOfFirstRegistration}</td>
                    <td>{these.cin}</td>
                    <td>{these.subject}</td>
                    <td>{these.supervisor}</td>
                    <td>{these.codeStructure}</td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_URL}api/user/download/production/${these._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        fichier PDF
                      </a>
                    </td>
                    <td>{these.cotutelle}</td>

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
                            onClick={(e) => handleModify(e, these._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, these._id)}
                          >
                            Supprimer
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
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
            <h2>{error.theseIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableThese;
