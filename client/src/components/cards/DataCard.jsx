import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { useModalContext } from '../../context/ModalContext'

export const DataCard = ({ data }) => {
  const { showModal } = useModalContext()
  return (
    <>
      <p className='w-full'>Aplikasi Perkantoran</p>
      <div className='flex flex-row gap-2'>
        <div className="items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-gray-500 hover:text-white"
            onClick={() => showModal('form-master-data-modal', 'Edit Data')}
          >
            <PencilIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Edit
          </button>
        </div>
        <div className="items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-gray-500 hover:text-white"
            onClick={() => showModal('delete-data-modal', 'Hapus Data')}
          >
            <TrashIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Hapus
          </button>
        </div>
      </div>
    </>
  )
}