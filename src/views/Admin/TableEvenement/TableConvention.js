// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
import { getConventions } from "actions/convention.action";
import AdminConventionForm from "../AdminForm/AdminConventionForm";

function TableConvention() {
  const dispatch = useDispatch();
  const adminConventions = useSelector((state) => state.conventionsReducer);
  // const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.conventionError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [conventionId, setConventionId] = useState(null);

  useEffect(() => {
    dispatch(getConventions());
  }, [dispatch]);

  // useEffect(() => {
  //   if (adminConventions.length !== 0)
  //     dispatch(getConventions());
  // }, [dispatch, adminConventions.length]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/convention/${id}`
      );
      // console.log("Convension supprimé avec succès !");
      dispatch(getConventions());
    } catch (error) {
      console.log("Erreur lors de la suppression du Convension :", error);
    }
  };
  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedConvention = adminConventions.find(
      (convention) => convention._id === id
    );
    if (selectedConvention) {
      setFormData({
        ...formData,
        title: selectedConvention.title,
        year: selectedConvention.year,
        type2: selectedConvention.type2,
        partner: selectedConvention.partner,
        type1: selectedConvention.type1,
        summary: selectedConvention.summary,
        financialImpact: selectedConvention.financialImpact,
        environmentalImpact: selectedConvention.environmentalImpact,
        creationDate: selectedConvention.creationDate,
      });
      setConventionId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setConventionId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette convention ?")) {
      handleDelete(id);
    }
  };
  return (
    <>
      {showForm ? (
        <AdminConventionForm
          conventionId={conventionId}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
          <h3 className="heading-section text-info mb-0">Convention</h3>
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
                <th scope="col">titre</th>
                <th scope="col">Année</th>
                <th scope="col">Type</th>
                <th scope="col">Partenaire</th>
                <th scope="col">Type</th>
                <th scope="col">Résumé</th>
                <th scope="col">Impact financier</th>
                <th scope="col">Impact en nature</th>
                <th scope="col">Date de création</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminConventions) &&
                adminConventions.map((convention, index) => (
                  <tr key={index}>
                    <td>{convention.title}</td>
                    <td>{convention.year}</td>
                    <td>{convention.type2}</td>
                    <td>{convention.partner}</td>
                    <td>{convention.type1}</td>
                    <td>{convention.summary}</td>
                    <td>{convention.financialImpact}</td>
                    <td>{convention.environmentalImpact}</td>
                    <td>{formatDate(convention.creationDate)}</td>
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
                            onClick={(e) => handleModify(e, convention._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, convention._id)}
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
          <div className="text-center text-dark">
            {" "}
            <h2>{error.conventionIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default TableConvention;