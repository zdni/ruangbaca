import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline'

import { BaseModal } from './BaseModal'
import { useAppContext } from '../../context/appContext'

export const TransactionModal = () => {
  const { modalId } = useAppContext()
  
  return (
    <BaseModal isOpen={modalId === 'transaction-modal'}>
      <div className="flex flex-col items-start">
        <img src="https://images.unsplash.com/photo-1608241561423-d65165321829" className="m-auto max-h-[160px] rounded object-cover" alt='cover' />
        <p className="mt-10 border-[1px] px-2 py-1 text-xs bg-emerald-300 font-light rounded-lg inline-block">
            <span className="flex flex-row gap-2">
              <TagIcon className='h-4 w-4 stroke-[1px]' />
              Status
            </span>
          </p>
        <p className='text-sm mt-2'>
          Judul Buku
        </p>
        <div className="w-full mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className='h-6 w-6' />
            </div>
            <div className="ml-3">
              <p className="text-xs font-semibold text-gray-900">
                Tgl Peminjamanm
              </p>
              <div className="flex text-xs text-gray-500">
                <time dateTime="2020-03-16">
                  Tgl
                </time>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className='h-6 w-6' />
            </div>
            <div className="ml-3">
              <p className="text-xs font-semibold text-gray-900">
                Tgl Pengembalian
              </p>
              <div className="flex text-xs text-gray-500">
                <time dateTime="2020-03-16">
                  Tgl
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}