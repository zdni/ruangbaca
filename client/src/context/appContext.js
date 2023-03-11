import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios'

import reducer from './reducer'
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
  categories: [],
  specializations: [],
  storages: [],
  form: {
    masterData: {
      name: ''
    },
  },
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
  error: '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/'
  })

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log('error: ', error)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const setForm = (form) => {
    dispatch({ type: SET_FORM, form: form })
  }
  
  const clearModal = () => {
    dispatch({ type: CLEAR_MODAL })
  }
  const displayModal = ( modalId, modalTitle ) => {
    dispatch({ type: DISPLAY_MODAL, modalId, modalTitle })
  }

  const setupUser = async ({ userLogin }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/auth/login',
        userLogin
      )

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_USER_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }
  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER })
  }

  const createData = async ({ form, url }) => {
    dispatch({ type: CREATE_DATA_BEGIN })
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/${url}`,
        form
      )

      dispatch({
        type: CREATE_DATA_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: CREATE_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }

  const getData = async (url, params) => {
    dispatch({ type: GET_DATA_BEGIN })
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/${url}${params}`
      )

      dispatch({
        type: GET_DATA_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: GET_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }

  const updateData = async (url) => {
    dispatch({ type: UPDATE_DATA_BEGIN })
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/${url}`,
        state.form
      )

      dispatch({
        type: UPDATE_DATA_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: UPDATE_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }

  const deleteData = async (url) => {
    dispatch({ type: DELETE_DATA_BEGIN })
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/${url}`
      )

      dispatch({
        type: DELETE_DATA_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: DELETE_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
      'http://localhost:3001/api/categories',
      )
      dispatch({ 
        type: GET_CATEGORIES,
        categories: data.categories
      })
    } catch (err) {
      dispatch({ 
        type: GET_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  const getMasterData = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3001/api/master-data',
      )
      dispatch({ 
        type: GET_MASTER_DATA,
        categories: data.categories,
        specializations: data.specializations,
        storages: data.storages,
      })
    } catch (err) {
      dispatch({ 
        type: GET_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  const createMasterData = async ({ form, url }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/${url}`,
        form
      )
      console.log(data)
      clearModal()

      getCategories()
    } catch (err) {
      dispatch({ 
        type: CREATE_DATA_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  const changeFormMasterData = ({ name }) => {
    dispatch({
      type: CHANGE_FORM_MASTER_DATA, 
      name: name, 
    })
  }

  useEffect(() => {

  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        changeFormMasterData,
        clearModal,
        createMasterData,
        displayModal,
        getCategories,
        getMasterData,
        logoutUser,
        setForm,
        setupUser
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