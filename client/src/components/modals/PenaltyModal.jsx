import { PlusIcon } from '@heroicons/react/24/outline'

import {
  Button,
  Textarea
} from '../atoms'
import { BaseModal } from './BaseModal'
import { useAppContext } from '../../context/appContext'

export const PenaltyModal = () => {
  const { changeFormValue, modal, createPenalty, form, updateTransaction } = useAppContext()

  const handleChange = (e) => {
    changeFormValue({
      key: 'penalty',
      value: {
        ...form.penalty,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createPenalty({
      form: {
        ...form.penalty,
        transaction_id: modal.data._id,
        user_id: modal.data.userId._id
      },
    })
    updateTransaction({
      form: { status: 'late' },
      id: modal.data._id
    })
  }

  return (
    <BaseModal isOpen={modal.id === 'penalty-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <Textarea 
          handleChange={handleChange}
          id='description' 
          placeholder='Masukkan Deskripsi' 
          value={form.penalty.description}
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