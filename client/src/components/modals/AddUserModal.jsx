import { UserPlusIcon } from '@heroicons/react/24/outline'

import { 
  Button,
  InputText,
  Select
} from '../atoms'

import { BaseModal } from './BaseModal'
import { useAppContext } from "../../context/appContext"

export const AddUserModal = () => {
  const { changeFormValue, createUser, form, modal, userTypeOptions } = useAppContext()
  const { user } = form

  const handleChange = (e) => {
    changeFormValue({
      key: 'user',
      value: {
        ...form.user,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    createUser({ user })
  }

  return (
    <BaseModal isOpen={ modal.id === 'add-user-modal'}>
      <form className='mt-5 flex flex-col gap-1'>
        <InputText
          handleChange={handleChange} 
          id='username' 
          placeholder='Masukkan Username' 
          value={user.username}
        />
        <InputText 
          handleChange={handleChange}
          id='name' 
          placeholder='Masukkan Nama Pengguna' 
          value={user.name}
        />
        {(
          user.role === 'student'
            &&
          <div className="flex flex-row gap-2">
            <InputText 
              handleChange={handleChange}
              id='idNumber' 
              placeholder='Masukkan NIM' 
              value={user.idNumber}
            />
            <InputText 
              handleChange={handleChange}
              id='classYear' 
              placeholder='Angkatan' 
              value={user.classYear}
            />
          </div>
        )}
        <Select
          handleChange={handleChange} 
          id='role' 
          options={userTypeOptions} 
          selectedValue={user.role} 
          keyText='text'
          keyValue='value'
        />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Tambah Pengguna' type='submit' onClick={handleSubmit}>
          <UserPlusIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
      <p className="text-xs mt-6 text-rose-600">*password default akan sama dengan username pengguna</p>
    </BaseModal>
  )
}