import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk"; // Assurez-vous que c'est `redux-thunk` et non pas juste `thunk`

// Import des fichiers CSS
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// Import des layouts
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AccueilLayout from "layouts/Accueil";

// Import des outils de développement
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

import { AuthProvider } from "components/AuthContext";
import { getPosts } from "actions/post.action";

// Création du store Redux avec les middlewares
const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk))
  applyMiddleware(thunk)
  //  si on ne veut pas l'outil de deboggage alors on fait ainsi
);


store.dispatch(getPosts());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/labo/*" element={<AdminLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/accueil/*" element={<AccueilLayout />} />
            <Route path="*" element={<Navigate to="accueil/home" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
    </React.StrictMode>
);
