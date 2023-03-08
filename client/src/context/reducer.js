import {
  CLEAR_MODAL,
  CLEAR_VALUES,
  DISPLAY_MODAL,
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

  if ( action.type === CLEAR_VALUES ) {
    return {
      ...initialState,
    }
  }

}

export default reducer