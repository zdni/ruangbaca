import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline' 

import { Button } from '../atoms'
import { BaseModal } from './BaseModal'
import { useAppContext } from "../../context/appContext"
import { HOME_LINK } from '../../utils/links.js'

export const LogoutModal = () => {
  const navigate = useNavigate()
  const { clearModal, modal, logoutUser, user } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    logoutUser()
    clearModal()
  }

  // useEffect(() => {
  //   if (!user) {
  //     setTimeout(() => {
  //       navigate(`${ HOME_LINK.path }`)
  //     }, 1000)
  //   }
  // }, [user, navigate])

  return (
    <BaseModal isOpen={modal.id === 'logout-modal'} >
      <form>
        <p>Apakah Anda ingin mengakhiri sesi Anda?</p>
        <div className="mt-5 items-stretch justify-center text-left sm:mt-6">
          <Button onClick={handleSubmit} text='Keluar' type={'submit'} >
            <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 cursor-pointer" />
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}