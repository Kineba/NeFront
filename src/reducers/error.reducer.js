import { GET_BREVET_ERRORS } from "actions/brevets.action";
import { GET_ARTICLE_ERRORS } from "actions/articles.action";
import { GET_OUVRAGE_ERRORS } from "actions/ouvrages.action";
import { GET_THESE_ERRORS } from "actions/theses.action";
import { GET_MASTER_ERRORS } from "actions/masters.action";
import { GET_CHAPTER_ERRORS } from "actions/chapters.action";
import { GET_HABILITATION_ERRORS } from "actions/habilitations.action";

import { GET_ALL_ARTICLE_ERRORS } from "actions/allArticles.action";
import { GET_ALL_BREVET_ERRORS } from "actions/allBrevets.action";
import { GET_ALL_CHAPTER_ERRORS } from "actions/allChapters.action";
import { GET_ALL_HABILITATION_ERRORS } from "actions/allHabilitations.action";
import { GET_ALL_MASTER_ERRORS } from "actions/allMasters.action";
import { GET_ALL_THESE_ERRORS } from "actions/allTheses.action";
import { GET_ALL_OUVRAGE_ERRORS } from "actions/allOuvrages.action";

import { GET_PROJET_ERRORS } from "actions/projet.action";
import { GET_MANIFESTATION_ERRORS } from "actions/manifestation.action";
import { GET_CONVENTION_ERRORS } from "actions/convention.action";

import { GET_POST_ERRORS } from "actions/post.action";


const initialState = {
  brevetError: [],
  articleError: [],
  ouvrageError: [],
  theseError: [],
  masterError: [],
  chapterError: [],
  habilitationError: [],


  allArticlesError: [],
  allBrevetsError: [],
  allChaptersError: [],
  allHabilitationsError: [],
  allMastersError: [],
  allThesesError: [],
  allOuvragesError: [],

  projetError: [],
  conventionError: [],
  manifestationError: [],

  postError: []
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREVET_ERRORS:
      return {
        ...state,
        brevetError: action.payload,
      };
    case GET_ARTICLE_ERRORS:
      return {
        ...state,
        articleError: action.payload,
      };
    case GET_OUVRAGE_ERRORS:
      return {
        ...state,
        ouvrageError: action.payload,
      };
    case GET_THESE_ERRORS:
      return {
        ...state,
        theseError: action.payload,
      };
    case GET_MASTER_ERRORS:
      return {
        ...state,
        masterError: action.payload,
      };
    case GET_CHAPTER_ERRORS:
      return {
        ...state,
        chapterError: action.payload,
      };
    case GET_HABILITATION_ERRORS:
      return {
        ...state,
        habilitationError: action.payload,
      };


      
    case GET_ALL_ARTICLE_ERRORS:
      return {
        ...state,
        allArticlesError: action.payload,
      };
    case GET_ALL_BREVET_ERRORS:
      return {
        ...state,
        allBrevetsError: action.payload,
      };
    case GET_ALL_CHAPTER_ERRORS:
      return {
        ...state,
        allChaptersError: action.payload,
      };
    case GET_ALL_HABILITATION_ERRORS:
      return {
        ...state,
        allHabilitationsError: action.payload,
      };
    case GET_ALL_MASTER_ERRORS:
      return {
        ...state,
        allMastersError: action.payload,
      };
    case GET_ALL_THESE_ERRORS:
      return {
        ...state,
        allThesesError: action.payload,
      };
    case GET_ALL_OUVRAGE_ERRORS:
      return {
        ...state,
        allOuvragesError: action.payload,
      };



      case GET_PROJET_ERRORS:
        return {
          ...state,
          projetError: action.payload,
        };
      case GET_MANIFESTATION_ERRORS:
        return {
          ...state,
          manifestationError: action.payload,
        };
      case GET_CONVENTION_ERRORS:
        return {
          ...state,
          conventionError: action.payload,
        };


      case GET_POST_ERRORS:
        return {
          ...state,
          conventionError: action.payload,
        };

    default:
      return state;
  }
}
