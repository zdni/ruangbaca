import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import {
  Button,
  InputSearch,
  Select
} from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const FilterUserModal = () => {
  const { modalId } = useAppContext()

  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value)
  }

  const types = [
    {value: 'lecture', text: 'Dosen'}, 
    {value: 'student', text: 'Mahasiswa'}, 
  ]
  
  return (
    <BaseModal isOpen={modalId === 'filter-user-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <InputSearch 
          handleChange={handleKeywordChange}
          id='keyword' 
          placeholder='Masukkan Nama Pengguna'
          value={keyword} 
        />
        <Select id='type' options={types} />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Terapkan'>
          <MagnifyingGlassIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}
