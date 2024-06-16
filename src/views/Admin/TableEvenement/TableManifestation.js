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
import { getManifestations } from "actions/manifestation.action";
import AdminManifestationForm from "../AdminForm/AdminManifestationForm";

function TableManifestation() {
  const dispatch = useDispatch();
  const adminManifestations = useSelector(
    (state) => state.manifestationsReducer
  );
  // const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.manifestationError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [manifestationId, setManifestationId] = useState(null);

  useEffect(() => {
    dispatch(getManifestations());
  }, [dispatch]);

  // useEffect(() => {
  //   if (adminManifestations.length !== 0)
  //     dispatch(getManifestations());
  // }, [dispatch, adminManifestations.length]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/convention/${id}`
      );
      // console.log("manifestation supprimé avec succès !");
      dispatch(getManifestations());
    } catch (error) {
      console.log("Erreur lors de la suppression du manifestation :", error);
    }
  };
  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedManifestation = adminManifestations.find(
      (manifestation) => manifestation._id === id
    );
    if (selectedManifestation) {
      setFormData({
        ...formData,
        year: selectedManifestation.year,
        title: selectedManifestation.title,
        organizers: selectedManifestation.organizers,
        dateOfOrganization: selectedManifestation.dateOfOrganization,
        location: selectedManifestation.location,
        type2: selectedManifestation.type2,
        webSite: selectedManifestation.webSite,
      });
      setManifestationId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setManifestationId(null);
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
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette manifestation ?")
    ) {
      handleDelete(id);
    }
  };
  return (
    <>
      {showForm ? (
        <AdminManifestationForm
          manifestationId={manifestationId}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="heading-section text-info mb-0">Manifestation</h3>
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
                <th scope="col">Organisateurs</th>
                <th scope="col">Date organisation</th>
                <th scope="col">Lieu</th>
                <th scope="col">Type</th>
                <th scope="col">Site Web</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminManifestations) &&
                adminManifestations.map((manifestation, index) => (
                  <tr key={index}>
                    <td>{manifestation.title}</td>
                    <td>{manifestation.year}</td>
                    <td>{manifestation.organizers}</td>
                    <td>{formatDate(manifestation.dateOfOrganization)}</td>
                    <td>{manifestation.location}</td>
                    <td>{manifestation.type2}</td>
                    <td>
                      <a
                        href={manifestation.webSite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {manifestation.webSite}
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
                        <DropdownMenu
                          className="dropdown-menu-arrow"
                          positionFixed
                        >
                          <DropdownItem
                            onClick={(e) => handleModify(e, manifestation._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, manifestation._id)}
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
            <h2>{error.manifestationIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default TableManifestation;
