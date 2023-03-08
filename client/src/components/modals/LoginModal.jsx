import { useState } from "react"
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline' 

import {
  Button,
  InputPassword,
  InputText
} from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from "../../context/appContext"

export const LoginModal = () => {
  const { modalId, clearModal } = useAppContext()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if( username.trim().length > 0 && password.trim().length > 0 ) {
      const data = {
        username,
        password
      }
      console.log( data )
    } else {
      console.log( 'Data Kosong' )
    }
    clearModal()
  }

  return (
    <BaseModal isOpen={modalId === 'login-modal'} >
      <form>
        <div className='mt-5 flex flex-col gap-1'>
          <InputText 
            handleChange={handleUsernameChange} 
            id='username' 
            placeholder='Masukkan Username' 
            value={username}
          />
          <InputPassword 
            handleChange={handlePasswordChange} 
            id='password' 
            placeholder='Masukkan Password'
            value={password}
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