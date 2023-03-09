import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import {
  Button,
  InputText
} from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const FormMasterDataModal = () => {
  const { modalId } = useAppContext()
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  return (
    <BaseModal isOpen={modalId === 'form-master-data-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <InputText 
          handleChange={handleTextChange}
          id='name' 
          placeholder='Masukkan Data' 
          value={text}
        />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Tambah Data'>
          <PlusIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}