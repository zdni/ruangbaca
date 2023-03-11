import {
  CHANGE_FORM_MASTER_DATA,
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CLEAR_MODAL,
  CLEAR_VALUES,
  CREATE_DATA_BEGIN,
  CREATE_DATA_ERROR,
  CREATE_DATA_SUCCESS,
  DELETE_DATA_BEGIN,
  DELETE_DATA_ERROR,
  DELETE_DATA_SUCCESS,
  DISPLAY_MODAL,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CATEGORIES,
  GET_DATA_BEGIN,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  GET_MASTER_DATA,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SET_FORM,
  SET_EDIT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  UPDATE_DATA_BEGIN,
  UPDATE_DATA_ERROR,
  UPDATE_DATA_SUCCESS
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if ( action.type === DISPLAY_MODAL ) {
    return {
      ...state,
      showModal: true,
      modalTitle: action.modalTitle,
      modalId: action.modalId,
    }
  }
  if ( action.type === CLEAR_MODAL ) {
    return {
      ...state,
      showModal: false,
      modalId: '',
    }
  }

  if ( action.type === SETUP_USER_BEGIN ) {
    return { ...state, isLoading: true }
  }
  if ( action.type === SETUP_USER_SUCCESS ) {
    return {
      ...state,
      user: action.payload,
    }
  }
  if ( action.type === SETUP_USER_ERROR ) {
    return {
     ...state,
      error: action.payload.message,
    }
  }
  if ( action.type === LOGOUT_USER ) {
    return {
      ...state,
      user: null
    }
  }
  
  if ( action.type === GET_CATEGORIES ) {
    return {
      ...state,
      categories: action.categories,
    }
  }
  if ( action.type === GET_MASTER_DATA ) {
    return {
      ...state,
      categories: action.categories,
      specializations: action.specializations,
      storages: action.storages,
    }
  }
  if ( action.type === GET_DATA_ERROR ) {
    return {
      ...state,
      error: action.payload.message,
    }
  }
  
  if ( action.type === SET_FORM ){
    return {
      ...state,
    }
  }
  if ( action.type === CHANGE_FORM_MASTER_DATA ){
    return {
      ...state,
      form: {
        ...state.form,
        masterData: {
          name: action.name
        }
      }
    }
  }
  if ( action.type === CLEAR_VALUES ) {
    return {
      ...initialState,
    }
  }

}

export default reducer