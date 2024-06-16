// import React from "react";
import React, { useState , useEffect } from "react";
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
import { getProjets } from "actions/projet.action";
import AdminProjetForm from "../AdminForm/AdminProjetForm";


function TableProjet() {
  const dispatch = useDispatch();
  const adminProjets = useSelector((state) => state.projetsReducer);
  // const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.projetError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [projetId, setProjetId] = useState(null);

  useEffect(() => {
    dispatch(getProjets());
  }, [dispatch]);

  // useEffect(() => {
  //   if (adminProjets.length !== 0)
  //     dispatch(getProjets());
  // }, [dispatch, adminProjets.length]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/convention/${id}`
      );
      // console.log("Projet supprimé avec succès !");
      dispatch(getProjets());
    } catch (error) {
      console.log("Erreur lors de la suppression du projet :", error);
    }
  };
  const handleModify = (e, id) => {
    e.preventDefault();
    const selectedProjet = adminProjets.find((projet) => projet._id === id);
    if (selectedProjet) {  
      setFormData({
        ...formData,
        title: selectedProjet.title,
        year: selectedProjet.year,
        code: selectedProjet.code,
        category: selectedProjet.category,
        type1: selectedProjet.type1,
        intituled: selectedProjet.intituled,
        coordProjet: selectedProjet.coordProjet,
        partProjet: selectedProjet.partProjet
       
      });
      setProjetId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setProjetId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };
  const confirmDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      handleDelete(id);
    }
  };

  return (
    <>
      {showForm ? (
        <AdminProjetForm projetId={projetId} setShowForm={setShowForm}/>
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
          <h3 className="heading-section text-info mb-0">Projet</h3>
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
                <th scope="col">Code</th>
                <th scope="col">categorie</th>
                <th scope="col">Type</th>
                <th scope="col">Intitulé</th>
                <th scope="col">Coordinateur du projet</th>
                <th scope="col">Part du budget</th>
                <th scope="col" />

              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminProjets) &&
                adminProjets.map((projet, index) => (
                  <tr key={index}>
                    <td>{projet.title}</td>
                    <td>{projet.year}</td>
                    <td>{projet.code}</td>
                    <td>{projet.category}</td>
                    <td>{projet.type1}</td>
                    <td>{projet.intituled}</td>
                    <td>{projet.coordProjet}</td>
                    <td>{projet.partProjet}</td>
                    
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
                        <DropdownMenu className="dropdown-menu-arrow" positionFixed >
                          <DropdownItem
                            onClick={(e) => handleModify(e, projet._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                           onClick={(e) => confirmDelete(e, projet._id)}
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
          <div className="text-center text-dark"> <h2>{error.projetIsEmpty}</h2></div>
        </>
      )}
    </>
  );
}
export default TableProjet;