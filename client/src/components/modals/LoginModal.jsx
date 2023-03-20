// import { useNavigate } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline' 

import {
  Button,
  InputPassword,
  InputText
} from '../atoms'
import { BaseModal } from './BaseModal'
import { useAppContext } from "../../context/appContext"
// import { MY_ACCOUNT_LINK } from '../../utils/links.js'

export const LoginModal = () => {
  // const navigate = useNavigate()
  const { changeFormValue, clearModal, form, modal, loginUser } = useAppContext()

  const handleChange = e => {
    changeFormValue({
      key: 'login',
      value: {
        ...form.login,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {username, password} = form.login

    if( username.trim().length > 0 && password.trim().length > 0 ) {
      const userLogin = {
        username,
        password
      }
      loginUser({ userLogin })
      // navigate(`${ MY_ACCOUNT_LINK.path }`)
      clearModal( 'login' )
    }
  }

  return (
    <BaseModal isOpen={modal.id === 'login-modal'} >
      <form>
        <div className='mt-5 flex flex-col gap-1'>
          <InputText 
            handleChange={handleChange} 
            id='username' 
            placeholder='Masukkan Username' 
            value={form.login.username}
          />
          <InputPassword 
            handleChange={handleChange} 
            id='password' 
            placeholder='Masukkan Password'
            value={form.login.password}
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