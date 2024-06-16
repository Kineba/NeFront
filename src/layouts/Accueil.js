import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

import SidebarHomePage from "components/Sidebar/SideBarHomePage";

import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // Pour afficher les les elements present dans le navbar et les filtrer selon notre preference
  const namesToFilter = ["Accueil",  "A propos", "Actualités","Membres ","Contactez-nous","Se connecter"];
  const filteredRoutes = routes.filter((route) =>
    namesToFilter.includes(route.name)
  );

  const getRoutes = (namesToFilter) => {
    return namesToFilter.map((prop, key) => {
      if (prop.layout === "/accueil") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };


  return (
    <>
      <SidebarHomePage
        {...props}
        routes={filteredRoutes}
        logo={{
          innerLink: "/accueil/home",
          imgSrc: require("../assets/img/brand/irescomath.png"),
          imgAlt: "...",
        }}
      />

      <div className="navbar-vertical.navbar-expand" ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/acueil/home" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
