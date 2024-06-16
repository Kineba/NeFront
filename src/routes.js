import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";


import Home from "views/HomePage/Home";
import About from "views/HomePage/About";
import Actuality from "views/HomePage/Actuality";
import Contact from "views/HomePage/Contact";

import Article from "views/User/ProductionScientifique/Article";
import Chapter from "views/User/ProductionScientifique/Chapter";
import Brevet from "views/User/ProductionScientifique/Brevet";
import Master from "views/User/ProductionScientifique/Master";
import Ouvrage from "views/User/ProductionScientifique/Ouvrage";
import These from "views/User/ProductionScientifique/These";
import Habilitation from "views/User/ProductionScientifique/Habilitation";

import Membres from "views/Admin/Membres";
import Projet from "views/Admin/Events/Projet";
import Manifestation from "views/Admin/Events/Manifestation";
import Convention from "views/Admin/Events/Convention";
import ArticleAdmin from "views/Admin/ProductionScientifique/Article";
import OuvrageAdmin from "views/Admin/ProductionScientifique/Ouvrage";
import ChapterAdmin from "views/Admin/ProductionScientifique/Chapter";
import BrevetAdmin from "views/Admin/ProductionScientifique/Brevet";
import TheseAdmin from "views/Admin/ProductionScientifique/These";
import MasterAdmin from "views/Admin/ProductionScientifique/Master";
import HabilitationAdmin from "views/Admin/ProductionScientifique/Habilitation";
import ForgotPassword from "views/examples/ForgotPassword";
import ResetPassword from "views/examples/ResetPassword";
import Rapport from "views/Admin/Rapport";
import GererSecretaire from "views/Admin/GererSecretaire";
import AdminContact from "views/HomePage/AdminContact";
import PersonnelList from "views/HomePage/PersonnelList";


var routes = [
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary", "user"]
  },
  {
    path: "/users",
    name: "Membres",
    icon: "ni ni-istanbul text-primary", 
    component: <Membres />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin"]
  },
  { 
    path: "/secretaire",
    name: "Gérer Secretaire",
    icon: "ni ni-badge text-info", 
    component: <GererSecretaire />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin"]
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    isPrivate: false,
  },
  {
    path: "/home",
    name: "Accueil",
    icon: "fas fa-home text-primary",
    component: <Home />,
    layout: "/accueil",
    isPrivate: false,
  },
  {
    path: "/about",
    name: "A propos",
    icon: "fas fa-info-circle text-info" ,
    component: <About />,
    layout: "/accueil",
    isPrivate: false,
  },
  
  {
    path: "/actuality",
    name: "Actualités",
    icon: "fas fa-newspaper text-success",
    component: <Actuality />,
    layout: "/accueil",
    isPrivate: false,
  },
  
  {
    path: "/gerer/actuality",
    name: "Gérer Actualités",
    icon: "fas fa-newspaper text-success",
    component: <Actuality />,
    layout: "/labo",
    allowedRoles: ["admin", "secretary"],
    isPrivate: true,
  },
  {
    path: "/info/contact",
    name: "Contact",
    icon: "fas fa-address-book text-dark",
    component: <AdminContact />,
    layout: "/labo",
    allowedRoles: ["admin", "secretary"],
    isPrivate: true,
  },
  
  {
    path: "/contact",
    name: "Contactez-nous",
    icon: "fas fa-envelope text-light",
    component: <Contact />,
    layout: "/accueil",
    isPrivate: false,
  },
  
  {
    path: "/personnel",
    name: "Membres ",
    icon: "fas fa-envelope text-light",
    component: <PersonnelList />,
    layout: "/accueil",
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Se connecter",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    isPrivate: false,
  },
  {
    path: "/forgot_password",
    icon: "ni ni-key-25 text-info",
    component: <ForgotPassword />,
    layout: "/auth",
    isPrivate: false,
  },
  {
    path: "/reset_password/:id/:token",
    // name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <ResetPassword />,
    layout: "/auth",
    isPrivate: false,
  },
  //production scientifique user
  {
    path: "/articles",
    name: "Articles Scientifique",
    icon: "fas fa-user",
    component: <Article />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin","user"]
  },
  {
    path: "/ouvrages",
    name: "Ouvrages Scientifique",
    icon: "fas fa-user",
    component: <Ouvrage />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    path: "/chapter",
    name: "Chapitres d'ouvrages",
    icon: "fas fa-user",
    component: <Chapter />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    path: "/these",
    name: "These",
    icon: "fas fa-user",
    component: <These />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    path: "/brevet",
    name: "Brevet",
    icon: "fas fa-user",
    component: <Brevet/>,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    path: "/master",
    name: "Master",
    icon: "fas fa-user",
    component: <Master />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    path: "/habilitation",
    name: "Habilitation",
    icon: "fas fa-user",
    component: <Habilitation />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "user"]
  },
  {
    layout: "/labo",
    // path: "/production-scientifique",
    name: "Interface GSR",
    icon: "fa fa-book text-muted",
    isPrivate: true,
    allowedRoles: ["admin", "user"],
    //Les dropdown pour production scientifique
    subItems: [
      { layout: "/labo", path: "/articles", name: "Articles Scientifique", icon: "fa fa-file-text text-primary"},
      { layout: "/labo", path: "/ouvrages", name: "Ouvrages Scientifique", icon: "fa fa-bookmark text-info" },
      { layout: "/labo", path: "/chapter", name: "Chapitres d'ouvrages", icon: "fa fa-file-alt text-success" },
      { layout: "/labo", path: "/brevet", name: "Brevet", icon: "fa fa-certificate text-light" },
      { layout: "/labo", path: "/these", name: "Thèse Doctarat", icon: "fa fa-graduation-cap text-dark" },
      { layout: "/labo", path: "/master", name: "mastère", icon: "fa fa-graduation-cap text-info" },
      { layout: "/labo", path: "/habilitation", name: "Habilitation", icon: "fa fa-graduation-cap text-info" },
      // Autres sous-éléments de menu
    ]
    
  },

   //Routes pour gerer les productions scientifiques
   {
    path: "/gerer/articles",
    name: "Articles Scientifique",
    icon: "fas fa-user",
    component: <ArticleAdmin/>,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/ouvrages",
    name: "Ouvrages Scientifique",
    icon: "fas fa-user",
    component: <OuvrageAdmin />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/chapter",
    name: "Chapitres d'ouvrages",
    icon: "fas fa-user",
    component: <ChapterAdmin />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/these",
    name: "These",
    icon: "fas fa-user",
    component: <TheseAdmin />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/brevet",
    name: "Brevet",
    icon: "fas fa-user",
    component: <BrevetAdmin/>,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/master",
    name: "Master",
    icon: "fas fa-user",
    component: <MasterAdmin />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/gerer/habilitation",
    name: "Habilitation",
    icon: "fas fa-user",
    component: <HabilitationAdmin />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    layout: "/labo",
    // path: "/production-scientifique",
    name: "Gerer production",
    icon: "fa fa-cogs text-dark",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"],
    //Les dropdown pour production scientifique
    subItems: [
      { layout: "/labo", path: "/gerer/articles", name: "Articles Scientifique", icon: "fa fa-file-text text-primary" ,component: <ArticleAdmin /> },
      { layout: "/labo", path: "/gerer/ouvrages", name: "Ouvrages Scientifique", icon: "fa fa-bookmark text-info",component: <OuvrageAdmin /> },
      { layout: "/labo", path: "/gerer/chapter", name: "Chapitres d'ouvrages", icon: "fa fa-file-alt text-success",component: <ChapterAdmin /> },
      { layout: "/labo", path: "/gerer/brevet", name: "Brevet", icon: "fa fa-certificate text-light",component: <BrevetAdmin /> },
      { layout: "/labo", path: "/gerer/these", name: "Thèse Doctarat", icon: "fa fa-graduation-cap text-dark",component: <TheseAdmin /> },
      { layout: "/labo", path: "/gerer/master", name: "mastère", icon: "fa fa-graduation-cap text-info",component: <MasterAdmin /> },
      { layout: "/labo", path: "/gerer/habilitation", name: "Habilitation", icon: "fa fa-graduation-cap text-info", component: <HabilitationAdmin /> },
      // Autres sous-éléments de menu
    ]
    
  },

  {
    path: "/projet",
    name: "Projet",
    // icon: "fa-briefcase text-primary",
    component: <Projet />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/convention",
    name: "Convention",
    // icon: "fa-gavel text-success",
    component: <Convention />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },
  {
    path: "/manifestation",
    name: "Manifestation",
    // icon: "fa-flag text-info",
    component: <Manifestation />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"]
  },

  {
    layout: "/labo",
    // path: "/events",
    name: "Evenements",
    icon: "fa fa-calendar-day text-info",
    isPrivate: true,
    allowedRoles: ["admin", "secretary"],
    //Les dropdown pour production scientifique
    subItems: [
      { layout: "/labo", path: "/projet", name: "Projet", icon: "fa fa-lightbulb text-dark", component: <Projet /> },
      { layout: "/labo", path: "/manifestation", name: "Manifestation", icon: "fa fa-bullhorn fa-2x text-info", component: <Manifestation /> },
      { layout: "/labo", path: "/convention", name: "Convention", icon: "fa fa-handshake text-success", component: <Convention /> },
    ]
    
    
  },
  {
    path: "/ropport",
    name: "Rapport",
    icon: "fas fa-calendar-alt text-success",
    component: <Rapport />,
    layout: "/labo",
    isPrivate: true,
    allowedRoles: ["admin"]
  },
  
]; 
export default routes;
