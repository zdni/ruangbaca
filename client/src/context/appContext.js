import React, { useReducer, useContext, useEffect, useState } from 'react';
import axios from 'axios'

import reducer from './reducer'
import {
  CHANGE_FORM_STATE,
  CHANGE_FORM_VALUES,
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CLEAR_MODAL,
  CLEAR_STATE,
  DISPLAY_ALERT,
  DISPLAY_MODAL,
  GET_DOCUMENT,
  GET_DOCUMENTS,
  GET_MASTER_DATA,
  GET_PENALTY,
  GET_PENALTIES,
  GET_RETURN,
  GET_RETURNS,
  GET_TRANSACTION,
  GET_TRANSACTIONS,
  GET_USER,
  GET_USER_LOGIN,
  GET_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_TOKEN,
  SET_ALERT,
  SET_USER_NULL,
  SETUP_AXIOS_BEGIN,
  SETUP_AXIOS_ERROR,
  SETUP_AXIOS_SUCCESS,
} from './actions'
import { CODE } from '../constants/string'

const userTypeOptions = [
  // { value: 'admin', text: 'Admin' },
  { value: 'lecture', text: 'Dosen' }, 
  { value: 'student', text: 'Mahasiswa' }, 
]
const documentTypeOptions = [
  { value: 'book', text: 'Buku' },
  { value: 'theses', text: 'Skripsi'  },
  { value: 'report', text: 'Laporan KP' }
]

const initialState = {
  alert: {
    show: false,
    text: 'tes',
    type: 'success',
  },
  documentTypeOptions,
  data: {
    categories: [],
    documents: [],
    document: null,
    penalties: [],
    penalty: null,
    returns: [],
    return: null,
    specializations: [],
    storages: [],
    transactions: [],
    transaction: null,
    users: [],
    user: null,
  },
  form: {
    state: 'create',
    changePassword: {
      confirmPassword: '',
      isDisabledButton: true,
      newPassword: '',
      oldPassword: '',
    },
    changeProfilePicture: {
      image: '',
      isDisabledButton: true,
    },
    document: {
      id: null,
      code: '',
      title: '',
      writer: '',
      cover: '',
      studentIdNumber: '',
      year: 2007,
      specializationId: null,
      mentorMain: '',
      mentorSecond: '',
      examinerMain: '',
      examinerSecond: '',
      examinerThird: '',
      storageId: null,
      publisher: '',
      stock: 1,
      categoryId: null,
      category: documentTypeOptions[0].value,
    },
    login: {
      username: '',
      password: ''
    },
    masterData: {
      id: null,
      name: ''
    },
    penalty: {
      description: '',
    },
    searchDocument: {
      category: '',
      categoryId: '',
      storageId: '',
      title: '',
      // isDisabledButton: true,
    },
    searchUser: {
      name: '',
      role: 'all'
    },
    transaction: {
      id: null,
      startDate: '',
      endDate: '',
      userId: null,
      documentId: null,
      status: '',
    },
    user: {
      id: null,
      classYear: '',
      idNumber: '',
      isDisabledButton: true,
      name: '',
      username: '',
      role: userTypeOptions[0].value,
    },
  },
  isLoading: false,
  isAuthenticated: false,
  modal: {
    data: null,
    id: '',
    title: '',
    url: '',
  },
  search: '',
  status: 'pending',
  user: null,
  userTypeOptions,
  error: '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [init, setInit] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/'
  })

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const clearState = () => {
    dispatch({ type: CLEAR_STATE })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = () => {
    dispatch({ type: CHANGE_PAGE })
  }

  // modal
  const displayModal = ({ modal }) => {
    dispatch({ type: DISPLAY_MODAL, modal })
  }
  const clearModal = ( key = '' ) => {
    dispatch({ type: CLEAR_MODAL, key })
  }
  const setAlert = ( data = null ) => {
    dispatch({ type: SET_ALERT, data })
    displayAlert()
  }
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
  }

  // form
  const changeFormValue = ({ key, value }) => {
    dispatch({ type: CHANGE_FORM_VALUES, key, value })
  }
  const changeFormState = ({ value }) => {
    dispatch({ type: CHANGE_FORM_STATE, value })
  }

  // ################### DATABASE ###################
  // AUTH
  const loginUser = async ({ userLogin }) => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/auth/login',
        userLogin
      )
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      dispatch({
        type: LOGIN_USER,
        payload: data.user,
        alert: {
          show: true,
          text: 'Login Berhasil',
          type:'success'
        }
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: {
          text: err.response.data.message,
          type
        }
      })
    }
    displayAlert()
    clearModal( 'login' )
  }
  const refreshToken = async () => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    const refreshToken = localStorage.getItem('refreshToken')
      try {
      const { data } = await axios.post(
        'http://localhost:3001/api/auth/refresh-token',
        refreshToken
      )
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      dispatch({
        type: REFRESH_TOKEN,
        payload: data,
        alert: {
          show: true,
          text: 'Refresh Token Berhasil',
          type:'success'
        }
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type: 'warn'
        }
      })
    }
    clearModal()
    displayAlert()
  }
  const logoutUser = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    dispatch({ 
      type: LOGOUT_USER, 
      alert: {
        show: true,
        text: 'Logout Berhasil',
        type: 'info',
      }
    })
    displayAlert()
  }

  // CATEGORY
  // SPECIALIZATION
  // STORAGE
  // MASTER DATA
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
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type 
        }
      })
      displayAlert()
    }
  }
  const createMasterData = async ({ form, url }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/${url}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
      getMasterData()
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal( 'masterData' )
    displayAlert()
  }
  const updateMasterData = async ({ form, url }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/${url}/${form.id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

      getMasterData()
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal( 'masterData' )
    displayAlert()
  }
  const deleteMasterData = async ({ url, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/${url}/${id}`
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
      getMasterData()
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal()
    displayAlert()
  }

  // DOCUMENT
  const getDocuments = async ({ limit = 0, query = ''} ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents?limit=${limit}&${query}`,
      )
      
      dispatch({
        type: GET_DOCUMENTS,
        documents: data.documents
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getDocument = async ({ id }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/documents/${id}`,
      )
      
      dispatch({
        type: GET_DOCUMENT,
        document: data.document
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const createDocument = async ({ form }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/documents`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('document')
    displayAlert()
  }
  const updateDocument = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`

      const { data } = await axios.put(
        `http://localhost:3001/api/documents/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    displayAlert()
  }
  const deleteDocument = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/documents/${id}`
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal()
    displayAlert()
  }

  // PENALTY
  const getPenalties = async ({ query }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/penalties?${query}`,
      )
      dispatch({ 
        type: GET_PENALTIES,
        penalties: data.penalties,
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getPenalty = async ({id}) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/penalties/${id}`,
      )
      dispatch({ 
        type: GET_PENALTY,
        penalty: data.penalty,
      })
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const createPenalty = async ({ form }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/penalties`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('penalty')
    displayAlert()
  }
  const updatePenalty = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/penalties/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

      getTransactions({})
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('penalty')
    displayAlert()
  }
  const deletePenalty = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/penalties/${id}`,
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('penalty')
    displayAlert()
  }

  // RETURN
  const getReturns = async ({ query }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/returns?${query}`,
      )
      dispatch({ 
        type: GET_RETURNS,
        returns: data.returns,
      })
    
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getReturn = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/returns/${id}`,
      )
      dispatch({ 
        type: GET_RETURN,
        return: data.return,
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const createReturn = async ({ form }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/returns`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

      getTransactions({})
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('return')
    displayAlert()
  }
  const updateReturn = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/returns/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('return')
    displayAlert()
  }
  const deleteReturn = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/returns/${id}`,
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('document')
    displayAlert()
  }

  // TRANSACTION
  const getTransactions = async ({ query }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/transactions?${query}`,
      )
      dispatch({ 
        type: GET_TRANSACTIONS,
        transactions: data.transactions,
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getTransaction = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/transactions/${id}`,
      )
      dispatch({ 
        type: GET_TRANSACTION,
        transaction: data.transaction,
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const createTransaction = async ({ form }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/transactions`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('transaction')
    displayAlert()
  }
  const updateTransaction = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/transactions/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

      getTransactions({})
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('transaction')
    displayAlert()
  }
  const deleteTransaction = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/transactions/${id}`,
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('transaction')
    displayAlert()
  }

  // USER
  const getUsers = async ({ query = '' }) => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/users?${query}`
      )
      dispatch({
        type: GET_USERS,
        users: data.users
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getUserLogin = async () => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/user`
      )
      dispatch({
        type: GET_USER_LOGIN,
        user: data.user
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const getUser = async ({ userId }) => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
      dispatch({ type: SET_USER_NULL })
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      
      const { data } = await axios.get(
        `http://localhost:3001/api/users/${userId}`
      )
      dispatch({
        type: GET_USER,
        user: data.user
      })

    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      displayAlert()
    }
  }
  const createUser = async ({ user }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/users`,
        user
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
      getUsers({})
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal( 'user' )
    displayAlert()
  }
  const changeProfilePicture = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/users/change-profile-picture/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
      getUserLogin()
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal( 'changeProfilePicture' )
    displayAlert()
  }
  const changeUserPassword = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/users/change-password/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
      clearModal( 'changePassword' )
      displayAlert()
      setTimeout(() => {
        logoutUser()
      }, 1500)
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
      clearModal( 'changePassword' )
      displayAlert()
    }
  }
  const changeUserProfile = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/users/${id}`,
        form
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })

      getUserLogin()
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal()
    displayAlert()
  }
  const resetUserPassword = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/users/reset-password/${id}`,
      )
      dispatch({
        type: SETUP_AXIOS_SUCCESS,
        alert: {
          text: data.message,
          type:'success'
        }
      })
      
    } catch (err) {
      let type = CODE[err.response.status]
      if( !type ) type = 'error'
      
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        alert: { 
          text: err.response.data.message,
          type,
        }
      })
    }
    clearModal('changePassword')
    displayAlert()
  }

  useEffect(() => {
    if(!init) {
      const accessToken = localStorage.getItem('accessToken')
      if( accessToken ) {
        getUserLogin()
      }
      setInit(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  return (
    <AppContext.Provider
      value={{
        ...state,

        clearState,
        clearFilters,
        changePage,
        
        displayAlert,
        displayModal,
        clearModal,
        setAlert,
        
        changeFormValue,
        changeFormState,
        
        loginUser,
        refreshToken,
        logoutUser,

        getMasterData,
        createMasterData,
        updateMasterData,
        deleteMasterData,
        
        getDocuments,
        getDocument,
        createDocument,
        updateDocument,
        deleteDocument,

        getPenalties,
        getPenalty,
        createPenalty,
        updatePenalty,
        deletePenalty,

        getReturns,
        getReturn,
        createReturn,
        updateReturn,
        deleteReturn,

        getTransactions,
        getTransaction,
        createTransaction,
        updateTransaction,
        deleteTransaction,

        getUsers,
        getUserLogin,
        getUser,
        createUser,
        changeProfilePicture,
        changeUserPassword,
        changeUserProfile,
        resetUserPassword
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