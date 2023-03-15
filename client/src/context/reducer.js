import {
  CHANGE_FORM_STATE,
  CHANGE_FORM_VALUES,
  CHANGE_PAGE,
  CHANGE_USER_PASSWORD,
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
  SETUP_AXIOS_SUCCESS,
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  
  if ( action.type === CLEAR_STATE ) {
    return { ...initialState, }
  }
  if ( action.type === CLEAR_FILTERS) {
    return { ...state, filters: initialState.filters, }
  }
  if ( action.type === CHANGE_PAGE) {
    return { ...state, page: action.page, }
  }

  // modal
  if ( action.type === DISPLAY_MODAL ) {
    return {
      ...state,
      modal: {
        data: action.modal.data || null,
        id: action.modal.id || '',
        title: action.modal.title || '',
        url: action.modal.url || ''
      },
    }
  }
  if ( action.type === CLEAR_MODAL ) {
    let form = { ...state.form } 
    if(action.key) {
      form = {
        ...state.form,
        [action.key]: initialState.form[action.key]
      }
    }

    return {
      ...state,
      modal: initialState.modal,
      form,
    }
  }

  // form
  if (action.type === CHANGE_FORM_VALUES) {
    return {
     ...state,
      form: {
      ...state.form,
        [action.key]: action.value
      }
    }
  }
  if (action.type === CHANGE_FORM_STATE) {
    return {
    ...state,
      form: {
      ...state.form,
        state: action.value
      }
    }
  }

  // axios
  if ( action.type === SETUP_AXIOS_BEGIN ) {
    return { ...state, isLoading: true }
  }
  if ( action.type === SETUP_AXIOS_SUCCESS ) {
    return { ...state, isLoading: false }
  }
  if ( action.type === SETUP_AXIOS_ERROR ) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.message,
    }
  }

  // AUTH
  if ( action.type === LOGIN_USER ) {
    return { ...state, isAuthenticated: true, user: action.payload }
  }
  if ( action.type === REFRESH_TOKEN ) {
    return {
      ...state,
      user: {
        ...state.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }
    }
  }
  if ( action.type === LOGOUT_USER ) {
    return { ...state, isAuthenticated: false, user: null }
  }

  // CATEGORY
  // SPECIALIZATION
  // STORAGE
  // MASTER DATA
  if ( action.type === GET_MASTER_DATA ) {
    return {
      ...state,
      data: {
        ...state.data,
        categories: action.categories,
        specializations: action.specializations,
        storages: action.storages,
      }
    }
  }

  // DOCUMENT
  if ( action.type === GET_DOCUMENTS ) {
    return {
      ...state,
      data: {
        ...state.data,
        documents: action.documents,
      }
    }
  }
  if ( action.type === GET_DOCUMENT ) {
    return {
      ...state,
      data: {
        ...state.data,
        document: action.document,
      }
    }
  }

  // PENALTY
  if ( action.type === GET_PENALTIES ) {
    return {
     ...state,
      data: {
       ...state.data,
        penalties: action.penalties,
      }
    }
  }
  if ( action.type === GET_PENALTY ) {
    return {
     ...state,
      data: {
       ...state.data,
        penalty: action.penalty,
      }
    }
  }

  // RETURN
  if ( action.type === GET_RETURNS ) {
    return {
     ...state,
      data: {
       ...state.data,
        returns: action.returns,
      }
    }
  }
  if ( action.type === GET_RETURN ) {
    return {
     ...state,
      data: {
       ...state.data,
        return: action.return,
      }
    }
  }

  // TRANSACTION
  if ( action.type === GET_TRANSACTIONS ) {
    return {
    ...state,
      data: {
      ...state.data,
        transactions: action.transactions,
      }
    }
  }
  if ( action.type === GET_TRANSACTION ) {
    return {
    ...state,
      data: {
      ...state.data,
        transaction: action.transaction,
      }
    }
  }

  // user
  if ( action.type === GET_USERS ) {
    return {
      ...state,
      data: {
        ...state.data,
        users: action.users
      }
    }
  }
  if ( action.type === GET_USER ) {
    return {
      ...state,
      data: {
        ...state.data,
        user: action.user
      }
    }
  }
  if ( action.type === GET_USER_LOGIN ) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.user
    }
  }
  if ( action.type === CHANGE_USER_PASSWORD ) {
    return {
      ...state,
      form: {
        ...state.form,
        changePassword: initialState.form.changePassword,
      }
    }
  }

}

export default reducer