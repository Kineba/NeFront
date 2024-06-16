// import React from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserMasterForm from "views/User/UserForm/UserMasterForm";
import { useDispatch } from "react-redux";
import { getAllMasters } from "actions/allMasters.action";
import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableMaster() {
  const dispatch = useDispatch();
  const allMasters = useSelector((state) => state.allMastersReducer);
  const error = useSelector((state) => state.errorReducer.allMastersError);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const [showForm, setShowForm] = useState(false);
  const [masterId, setMasterId] = useState(null);

  useEffect(() => {
    dispatch(getAllMasters());
  }, [dispatch]);

  // useEffect(() => {
  //   if (allMasters.length !== 0) dispatch(getAllMasters());
  // }, [dispatch, allMasters.length]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Mastère supprimée avec succès !");
      dispatch(getAllMasters());
    } catch (error) {
      console.log("Erreur lors de la suppression du Mastère :", error);
    }
  };

  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedMaster = allMasters.find((master) => master._id === id);
    if (selectedMaster) {
      setFormData({
        ...formData,
        title: selectedMaster.title,
        year: selectedMaster.year,
        // file: selectedMaster.file,
        firstNameLastName: selectedMaster.firstNameLastName,
        cin: selectedMaster.cin,
        yearOfFirstRegistration: selectedMaster.yearOfFirstRegistration,
        subject: selectedMaster.subject,
        supervisor: selectedMaster.supervisor,
      });
      setMasterId(id);
      setShowForm(true);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setMasterId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce mastère ?")) {
      handleDelete(id);
    }
  };

  return (
    <>
      {showForm ? (
        <UserMasterForm masterId={masterId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
          <h3 className="heading-section text-info mb-0">Mastère</h3>
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
                <th scope="col">Nom et prénom de l'étudiant </th>
                <th scope="col">Cin</th>
                <th scope="col">Année de prémière inscription</th>
                <th scope="col">Fichier PDF </th>

                <th scope="col">Sujet</th>
                <th scope="col">Encadrant</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allMasters) &&
                allMasters.map((master, index) => (
                  <tr key={index}>
                    <td>{master.title}</td>
                    <td>{master.year}</td>
                    <td>{master.firstNameLastName}</td>
                    <td>{master.cin}</td>
                    <td>{master.yearOfFirstRegistration}</td>
                    <td>
                      {" "}
                      <a
                        href={`${process.env.REACT_APP_API_URL}api/user/download/production/${master._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        fichier PDF
                      </a>
                    </td>

                    <td>{master.subject}</td>
                    <td>{master.supervisor}</td>

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
                            onClick={(e) => handleModify(e, master._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => confirmDelete(e, master._id)}
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
            <h2>{error.masterIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableMaster;
