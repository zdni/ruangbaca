import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import {
  Button,
  InputSearch,
  Select
} from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const FilterUserModal = () => {
  const { changeFormValue, clearModal, form, getUsers, modal, userTypeOptions } = useAppContext()
  const { searchUser } = form

  const handleChange = (e) => {
    changeFormValue({
      key: 'searchUser',
      value: {
        ...form.searchUser,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let query = `name=${searchUser.name}&role=${searchUser.role}`

    getUsers({
      query
    })
    clearModal()
  }

  return (
    <BaseModal isOpen={modal.id === 'filter-user-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <InputSearch 
          handleChange={handleChange}
          id='name' 
          placeholder='Masukkan Nama Pengguna'
          value={searchUser.name} 
        />
        <Select 
          id='role' 
          options={userTypeOptions}
          handleChange={handleChange}
          keyText='text'
          keyValue='value'
          optionAll={true}
          selectedValue={searchUser.role}
        />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Terapkan' type='submit' onClick={handleSubmit} >
          <MagnifyingGlassIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}
