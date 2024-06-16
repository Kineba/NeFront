// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Fonction pour sauvegarder l'utilisateur dans le sessionStorage
  const saveUserToSessionStorage = (user, expirationTime) => {
    const userWithExpiration = {
      user,
      expirationTime,
    };
    sessionStorage.setItem("user", JSON.stringify(userWithExpiration));
  };

  // Fonction pour charger l'utilisateur à partir du sessionStorage
  const loadUserFromSessionStorage = () => {
    const userWithExpiration = JSON.parse(sessionStorage.getItem("user"));
    if (!userWithExpiration) {
      return null;
    }
    if (new Date().getTime() > userWithExpiration.expirationTime) {
      sessionStorage.removeItem("user");
      return null;
    }
    return userWithExpiration.user;
  };

  // Initialisation de l'état utilisateur à partir du sessionStorage
  const [user, setUser] = useState(loadUserFromSessionStorage());

  // Fonction pour gérer la connexion de l'utilisateur
  const login = async (email, password) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}api/user/login`,
      { email, password },
      { withCredentials: true }
    );
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Exemple : 24 heures
    setUser({ ...response.data, role: response.data.role }); // Inclure le rôle
    saveUserToSessionStorage(
      { ...response.data, role: response.data.role },
      expirationTime
    );
    return response;
  };

  // Fonction pour supprimer un cookie
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key);
    }
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const logout = async () => {
    sessionStorage.removeItem("user"); // Remplacement de localStorage par sessionStorage
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
        setUser(null);
      })
      .catch((err) => console.log(err));
    window.location = "/accueil/home";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
