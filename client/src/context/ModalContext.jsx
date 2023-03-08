import { createContext, useCallback, useContext, useState } from "react";

const defaultModalContext = {
  modalShowOpen: '',
  titleModal: 'Modal',
  showModal: () => null
}

const ModalContext = createContext(defaultModalContext)
ModalContext.displayName = 'ModalContext'

export const useModalContext = () => useContext(ModalContext)

export const ModalProvider = ({children}) => {
  const [modalShowOpen, setModalShowOpen] = useState('')
  const [titleModal, setTitleModal] = useState('')

  const showModal = useCallback((modalId, titleModal) => {
    console.log( 'showModal' )
    if(!titleModal) titleModal = 'Modal'

    setModalShowOpen(modalId)
    setTitleModal(titleModal)
  }, [setModalShowOpen])

  return (
    <ModalContext.Provider
      value={{
        modalShowOpen,
        titleModal,
        showModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}