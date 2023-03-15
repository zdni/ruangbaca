import { PlusIcon } from '@heroicons/react/24/outline'

import {
  Button,
  InputText
} from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const FormMasterDataModal = () => {
  const { changeFormValue, modal, createMasterData, form, updateMasterData } = useAppContext()

  const handleChange = (e) => {
    changeFormValue({
      key: 'masterData',
      value: {
        ...form.masterData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(form.state === 'create') {
      createMasterData({
        form: form.masterData,
        url: modal.url
      })
    } else if (form.state === 'update') {
      updateMasterData({
        form: form.masterData,
        url: modal.url
      })
    }
  }

  return (
    <BaseModal isOpen={modal.id === 'form-master-data-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <InputText 
          handleChange={handleChange}
          id='name' 
          placeholder='Masukkan Data' 
          value={form.masterData.name}
        />
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Simpan' type='submit' onClick={handleSubmit}>
          <PlusIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}