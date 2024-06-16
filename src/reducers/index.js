import { combineReducers } from 'redux';

import secretaireReducer from './secretaire.action'

import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import articlesReducer from './articles.reducer';
import brevetsReducer from './brevets.reducer';
import ouvragesReducer from './ouvrages.reducer';
import thesesReducer from './theses.reducer';
import chaptersReducer from './chapters.reducer';
import habilitationsReducer from './habilitations.reducer';
import mastersReducer from './masters.reducer';

import allArticlesReducer from './allArticles.reducer';
import allBrevetsReducer from './allBrevets.reducer';
import allChaptersReducer from './allChapters.reducer';
import allMastersReducer from './allMasters.reducer';
import allThesesReducer from './allTheses.reducer';
import allHabilitationsReducer from './allHabilitations.reducer';
import allOuvragesReducer from './allOuvrages.reducer';

import projetsReducer from './projet.reducer';
import manifestationsReducer from './manifestation.reducer';
import conventionsReducer from './convention.reducer';


import postReducer from './post.reducer';

import contactReducer from './contact.reducer';

import errorReducer from './error.reducer';





export default combineReducers({
  secretaireReducer,

  userReducer,
  usersReducer,
  articlesReducer,
  brevetsReducer,
  mastersReducer,
  ouvragesReducer,
  thesesReducer,
  chaptersReducer,
  habilitationsReducer,

  allArticlesReducer,
  allBrevetsReducer,
  allChaptersReducer,
  allMastersReducer,
  allThesesReducer,
  allHabilitationsReducer,
  allOuvragesReducer,

  projetsReducer,
  manifestationsReducer,
  conventionsReducer,

  postReducer,

  contactReducer,
  
  errorReducer
});