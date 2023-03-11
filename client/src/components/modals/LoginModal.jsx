import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline' 

import {
  Button,
  InputPassword,
  InputText
} from '../atoms'
import { BaseModal } from './BaseModal'
import { useAppContext } from "../../context/appContext"
import { MY_ACCOUNT_LINK } from '../../utils/links.js'

const initialState = {
  username: '',
  password: ''
}

export const LoginModal = () => {
  const navigate = useNavigate()
  const { clearModal, modalId, setupUser } = useAppContext()
  const [state, setState] = useState(initialState)

  const handleChange = e => {
    setState({
    ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {username, password} = state

    if( username.trim().length > 0 && password.trim().length > 0 ) {
      const userLogin = {
        username,
        password
      }
      setupUser({ userLogin })
      navigate(`${ MY_ACCOUNT_LINK.path }`)
    } else {
      setupUser({  })
    }
    clearModal()
  }

  return (
    <BaseModal isOpen={modalId === 'login-modal'} >
      <form>
        <div className='mt-5 flex flex-col gap-1'>
          <InputText 
            handleChange={handleChange} 
            id='username' 
            placeholder='Masukkan Username' 
            value={state.username}
          />
          <InputPassword 
            handleChange={handleChange} 
            id='password' 
            placeholder='Masukkan Password'
            value={state.password}
          />
        </div>
        <div className="mt-5 items-stretch justify-center text-left sm:mt-6">
          <Button onClick={handleSubmit} text='Masuk' type={'submit'} >
            <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 cursor-pointer" />
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}