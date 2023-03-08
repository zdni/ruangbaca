import { useState } from "react"
import { UserPlusIcon } from '@heroicons/react/24/outline'

import { 
  Button,
  InputText,
  Select
} from '../atoms'

import { BaseModal } from './BaseModal'
import { useAppContext } from "../../context/appContext"

const initialState = {
  idenityNumber: '',
  name: '',
  username: '',
  type: 'lecture',
}

export const AddUserModal = () => {
  const { userTypeOptions, modalId } = useAppContext()
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name] : e.target.value,
    })
  }

  return (
    <BaseModal isOpen={ modalId === 'add-user-modal'}>
      <form className='mt-5 flex flex-col gap-1'>
        <InputText
          handleChange={handleChange} 
          id='username' 
          placeholder='Masukkan Username' 
          value={values.username}
        />
        <InputText 
          handleChange={handleChange}
          id='name' 
          placeholder='Masukkan Nama Pengguna' 
          value={values.name}
        />
        <InputText 
          handleChange={handleChange}
          id='idenityNumber' 
          placeholder='Masukkan NIM' 
          value={values.identityNumber}
        />
        <Select
          handleChange={handleChange} 
          id='type' 
          options={userTypeOptions} 
          selectedValue={values.type} 
        />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Tambah Pengguna'>
          <UserPlusIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
      <p className="text-xs mt-6 text-rose-600">*password default akan sama dengan username pengguna</p>
    </BaseModal>
  )
}