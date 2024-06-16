import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { UidContext } from "components/AppContext/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "actions/user.actions";

import { useAuth } from "components/AuthContext";

const Admin = (props) => {
  const dispatch = useDispatch();
  // Utilisation du hook useAuth pour accéder à l'état de l'utilisateur
  const { user } = useAuth();

  // Référence pour le contenu principal afin de faciliter le défilement vers le haut
  const mainContent = React.useRef(null);
  const location = useLocation();

  // État local pour stocker l'id de l'utilisateur
  const [uid, setUid] = useState(null);

  // Dispatcher Redux pour déclencher des actions


  // Effet pour remonter en haut de la page à chaque changement de route
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // Effet pour récupérer l'ID utilisateur et déclencher les actions Redux
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true, // Envoie les cookies avec la requête
      })
        .then((res) => {
          setUid(res.data); // Stocke l'ID utilisateur dans l'état local
        })
        .catch((err) => console.log("No token"));
    };
    // fetchToken();
    fetchToken();

    if (uid) dispatch(getUser(uid)); // Déclenche une action Redux pour obtenir les données utilisateur
  }, [uid, dispatch]);

  // Filtrer les routes en fonction du rôle de l'utilisateur
  const getFilteredRoutes = () => {
    let namesToFilter = [];
    if (user && user.role === "user") {
      namesToFilter = ["Profile", "Interface GSR"];
    } else if (user && user.role === "admin") {
      namesToFilter = [
        "Profile",
        "Interface GSR",
        "Evenements",
        "Membres",
        "Gerer production",
        "Rapport",
        "Gérer Secretaire",
        "Gérer Actualités",
        "Contact"
      ];
    } else if (user && user.role === "secretary") {
      namesToFilter = ["Profile", "Gerer production", "Evenements","Gérer Actualités","Contact"];
    }
    return routes.filter((route) => namesToFilter.includes(route.name));
  };

  const filteredRoutes = getFilteredRoutes();

  // Fonction pour générer les routes à partir de la liste des routes filtrées, Vérifie si la route est privée et si l'utilisateur est autorisé à y accéder
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/labo") {
        return (
          <Route
            path={prop.path}
            element={
              prop.isPrivate &&
              user !== null &&
              prop.allowedRoles.includes(user.role) ? (
                prop.component
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  // Fonction pour obtenir le texte de la marque en fonction de l'URL actuelle
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <UidContext.Provider value={uid}>
        <Sidebar
          {...props}
          routes={filteredRoutes}
          logo={{
            innerLink: "/labo/profile",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props?.location?.pathname)}
          />
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/labo/profile" replace />} />
          </Routes>
          <hr className="mt-5" />
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </UidContext.Provider>
    </>
  );
};

export default Admin;
