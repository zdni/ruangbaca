import { CalendarIcon } from '@heroicons/react/24/outline'
import moment from 'moment'

import { BaseModal } from './BaseModal'
import { useAppContext } from '../../context/appContext'

export const TransactionModal = () => {
  const statuses = {
    submission: "Pengajuan",
    approve: "Dipinjam",
    done: "Dikembalikan",
    late: "Terlambat",
    late_done: "Pengembalian Terlambat",
    paid_done: "Sanksi Dibayar",
    cancel: "Batal",
  }
  const { modal } = useAppContext()
  
  return (
    <BaseModal isOpen={modal.id === 'transaction-modal'}>
      {(
        modal.data && modal.documentId
          &&
        <div className="flex flex-col items-start">
          <img src="https://images.unsplash.com/photo-1608241561423-d65165321829" className="m-auto max-h-[160px] rounded object-cover" alt='cover' />
          <p className="mt-10 border-[1px] px-2 py-1 text-xs font-light rounded-lg inline-block">
              <span className="flex flex-row gap-2">
                {statuses[modal.data.status]}
              </span>
            </p>
          <p className='text-sm mt-2'>
            {modal.data.documentId.title}
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
                  <time dateTime={moment(modal.data.startDate).format('LL')}>
                    {moment(modal.data.startDate).format('LL')}
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
                  <time dateTime={moment(modal.data.endDate).format('LL')}>
                    {moment(modal.data.endDate).format('LL')}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  )
}