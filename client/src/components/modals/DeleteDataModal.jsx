import { TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const DeleteDataModal = () => {
  const { modalId } = useAppContext()

  return (
    <BaseModal isOpen={modalId === 'delete-data-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <p className='text-sm font-medium'>Yakin ingin menghapus data?</p>
      </form>
      <div className="mt-8 items-stretch justify-center text-left">
        <Button text='Hapus Data'>
          <TrashIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}