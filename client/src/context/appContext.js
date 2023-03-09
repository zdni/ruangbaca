import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios'

import reducer from './reducer'
import {
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
  GET_DATA_BEGIN,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT,
  UPDATE_DATA_BEGIN,
  UPDATE_DATA_ERROR,
  UPDATE_DATA_SUCCESS
} from './actions'

const userTypeOptions = [
  {value: 'lecture', text: 'Dosen'}, 
  {value: 'student', text: 'Mahasiswa'}, 
]

const initialState = {
  isEditing: false,
  isLoading: false,
  isAuthenticated: false,
  modalId: '',
  modalTitle: '',
  showModal: false,
  search: '',
  status: 'pending',
  user: null,
  userLoading: true,
  userTypeOptions: userTypeOptions,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/'
  })

  const displayModal = ( modalId, modalTitle ) => {
    dispatch({ type: DISPLAY_MODAL, modalId, modalTitle })
  }
  const clearModal = () => {
    dispatch({ type: CLEAR_MODAL })
  }
  useEffect(() => {

  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayModal,
        clearModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }