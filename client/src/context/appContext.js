import React, { useReducer, useContext, useEffect } from 'react';

import reducer from './reducer'
import {
  CLEAR_MODAL,
  DISPLAY_MODAL,
} from './actions'

const userTypeOptions = [
  {value: 'lecture', text: 'Dosen'}, 
  {value: 'student', text: 'Mahasiswa'}, 
]

const initialState = {
  showModal: false,
  modalTitle: '',
  modalId: '',
  userTypeOptions: userTypeOptions,
  user: null,
  userLoading: true,
  isLoading: false,
  isEditing: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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