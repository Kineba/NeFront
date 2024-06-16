// TableBrevet.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBrevets } from "actions/brevets.action";
import UserBrevetForm from "../UserForm/UserBrevetForm";
import axios from "axios";
import {
  Table,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableBrevet() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userBrevets = useSelector((state) => state.brevetsReducer);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const [brevetId, setBrevetId] = useState(null);
  const error = useSelector((state) => state.errorReducer.brevetError);

  useEffect(() => {
    dispatch(getBrevets(userData.email));
  }, [dispatch,userData.email]);

  // useEffect(() => {
  //   if (userBrevets.length !== 0) dispatch(getBrevets(userData.email));
  // }, [dispatch, userBrevets.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Brevet supprimé avec succès !");
      dispatch(getBrevets(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du brevet :", error);
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedBrevet = userBrevets.find((brevet) => brevet._id === id);
    if (selectedBrevet) {
      setFormData({
        ...formData,
        title: selectedBrevet.title,
        year: selectedBrevet.year,
        reference: selectedBrevet.reference,
        cin: selectedBrevet.cin,
        creationDate: selectedBrevet.creationDate,
        type_: selectedBrevet.type_,
      });
      setBrevetId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBrevetId(null); // Réinitialiser l'ID pour l'ajout
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
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce brevet ?")) {
      handleDelete(id);
    }
  };

  return (
    <>
      {showForm ? (
        <UserBrevetForm brevetId={brevetId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Brevet</h3>
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
                <th scope="col">Référence</th>
                <th scope="col">Cin</th>
                <th scope="col">Fichier</th>
                <th scope="col">Date création</th>
                <th scope="col">Type</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userBrevets) &&
                userBrevets.map((brevet, index) => (
                  <tr key={index}>
                    <td>{brevet.title}</td>
                    <td>{brevet.year}</td>
                    <td>{brevet.reference}</td>
                    <td>{brevet.cin}</td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_URL}api/user/download/production/${brevet._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        fichier PDF
                      </a>
                    </td>
                    <td>{formatDate(brevet.creationDate)}</td>
                    <td>{brevet.type_}</td>
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
                            onClick={(e) => handleModify(e, brevet._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, brevet._id)}
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
            <h2>{error.empty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableBrevet;
