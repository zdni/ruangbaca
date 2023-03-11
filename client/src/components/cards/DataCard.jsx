import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { useAppContext } from '../../context/appContext'

export const DataCard = ({ items }) => {
  const { displayModal } = useAppContext()
  
  return (
    <>
      {(items && items.map((item, index) => (
        <span key={index} className='p-4 border rounded-xl flex flex-row gap-2 mb-2'>
          <p className='w-full'>{item.name}</p>
          <div className='flex flex-row gap-2'>
            <div className="items-stretch justify-center text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent border-secondary px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
                onClick={() => displayModal('form-master-data-modal', 'Edit Data')}
              >
                <PencilIcon className="mr-2 h-4 w-4 stroke-[1px]" />
                Edit
              </button>
            </div>
            <div className="items-stretch justify-center text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent border-secondary px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
                onClick={() => {displayModal('delete-data-modal', 'Hapus Data')}}
              >
                <TrashIcon className="mr-2 h-4 w-4 stroke-[1px]" />
                Hapus
              </button>
            </div>
          </div>
        </span>
      )))}
    </>
  )
}