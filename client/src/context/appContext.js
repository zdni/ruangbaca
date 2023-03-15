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
  SETUP_AXIOS_BEGIN,
  SETUP_AXIOS_ERROR,
  // SETUP_AXIOS_SUCCESS,
} from './actions'

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
      image: null,
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
      console.log('error: ', error)
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
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
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
        payload: data
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
    clearModal()
  }
  const logoutUser = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    dispatch({ type: LOGOUT_USER })
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
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      clearModal( 'masterData' )

      getMasterData()
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const updateMasterData = async ({ form, url }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/${url}/${form.id}`,
        form
      )
      console.log(data)
      clearModal( 'masterData' )

      getMasterData()
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const deleteMasterData = async ({ url, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/${url}/${id}`
      )
      console.log(data)
      clearModal()

      getMasterData()
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
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
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      clearModal('document')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const updateDocument = async ({ form }) => {
    try {
      
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const deleteDocument = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/documents/${id}`
      )
      console.log(data)
      clearModal()
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  // PENALTY
  const getPenalties = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/penalties`,
      )
      dispatch({ 
        type: GET_PENALTIES,
        penalties: data.penalties,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      
      clearModal('penalty')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const updatePenalty = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/penalties/${id}`,
        form
      )
      console.log(data)
      clearModal('penalty')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const deletePenalty = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/penalties/${id}`,
      )
      console.log(data)
      clearModal('penalty')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  // RETURN
  const getReturns = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/returns`,
      )
      console.log(data)
      dispatch({ 
        type: GET_RETURNS,
        returns: data.returns,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const getReturn = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/returns/${id}`,
      )
      console.log(data)
      dispatch({ 
        type: GET_RETURN,
        return: data.return,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      clearModal('return')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const updateReturn = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/returns/${id}`,
        form
      )
      console.log(data)
      clearModal('return')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const deleteReturn = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/returns/${id}`,
      )
      console.log(data)
      clearModal('document')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  // TRANSACTION
  const getTransactions = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/transactions`,
      )
      dispatch({ 
        type: GET_TRANSACTIONS,
        transactions: data.transactions,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const getTransaction = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        `http://localhost:3001/api/transactions/${id}`,
      )
      console.log(data)
      dispatch({ 
        type: GET_TRANSACTION,
        transaction: data.transaction,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      clearModal('transaction')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const updateTransaction = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/transactions/${id}`,
        form
      )
      console.log(data)
      clearModal('transaction')
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const deleteTransaction = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.delete(
        `http://localhost:3001/api/transactions/${id}`,
      )
      console.log(data)
      clearModal('transaction')
      dispatch({ 
        type: GET_MASTER_DATA,
        categories: data.categories,
        specializations: data.specializations,
        storages: data.storages,
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  // USER
  const getUsers = async () => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.get(
        'http://localhost:3001/api/users'
      )

      dispatch({
        type: GET_USERS,
        users: data.users
      })
    } catch (err) {
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(err)
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const getUser = async ({ userId }) => {
    dispatch({ type: SETUP_AXIOS_BEGIN })
    try {
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
      console.log(err)
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
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
      console.log(data)
      clearModal( 'user' )

      getUsers()
    } catch (err) {
      console.log(err)
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const changeUserPassword = async ({ form, id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.post(
        `http://localhost:3001/api/users/reset-password/${id}`,
        form
      )
      console.log(data)
      clearModal( 'changeUserPassword' )

      getMasterData()
    } catch (err) {
      console.log(err)
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }
  const resetUserPassword = async ({ id }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`
      
      const { data } = await axios.put(
        `http://localhost:3001/api/users/reset-password/${id}`,
      )
      console.log(data)
      clearModal()

    } catch (err) {
      console.log(err)
      dispatch({ 
        type: SETUP_AXIOS_ERROR,
        payload: { message: err.response.data.message }
      })
    }
  }

  useEffect(() => {
    if(!init) {
      const accessToken = localStorage.getItem('accessToken')
      if( accessToken ) {
        getUserLogin()
      }

      setInit(true)
    }
  }, [init])

  return (
    <AppContext.Provider
      value={{
        ...state,

        clearState,
        clearFilters,
        changePage,
        
        displayModal,
        clearModal,
        
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
        changeUserPassword,
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