import { TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const DeleteDocumentModal = () => {
  const { deleteDocument, modal } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    deleteDocument({
      id: modal.data._id,
    })
  }

  return (
    <BaseModal isOpen={modal.id === 'delete-document-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <p className='text-sm font-medium'>Yakin ingin menghapus dokumen?</p>
        <div className="mt-8 items-stretch justify-center text-left">
          <Button text='Hapus Data' type='submit' onClick={handleSubmit}>
            <TrashIcon className="mr-2 h-6 w-6 cursor-pointer" />
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}