import {
  CalendarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Badge } from '../atoms'
import { useAppContext } from '../../context/appContext'

export const TransactionInformationCard = ({ transaction }) => {
  const statuses = {
    submission: "Pengajuan",
    approve: "Dipinjam",
    done: "Dikembalikan",
    late: "Terlambat",
    late_done: "Pengembalian Terlambat",
    paid_done: "Sanksi Dibayar",
    cancel: "Batal",
  }
  const { displayModal } = useAppContext()

  return (
    <div className="border-[1px] h-[200px] rounded-lg shadow w-[420px] flex">
      <img src="https://images.unsplash.com/photo-1608241561423-d65165321829" className="w-2/5 rounded object-cover" alt='cover' />
      <div className="py-6 px-3 flex flex-col justify-between">
        <div>
          <Badge text={statuses[transaction.status]} bgColor='bg-default' />
          <Link
            to={{
              pathname: '/document'
            }}
            className="mt-2 block hover:underline"
          >
            <p className="font-medium text-sm text-gray-900 line-clamp-2">
              {transaction.documentId.title}
            </p>
          </Link>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex-shrink-0">
            <CalendarIcon className='h-4 w-4' />
          </div>
          <div className="ml-3">
            <p className="text-xs font-semibold text-gray-900">
              Tanggal Pengembalian
            </p>
            <div className="flex text-xs text-gray-500">
              <time dateTime={moment(transaction.endDate).format('LL')}>
                {moment(transaction.endDate).format('LL')}
              </time>
            </div>
          </div>
        </div>
        <div className="mt-4 items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
            onClick={() => displayModal({
              modal: {
                id: 'transaction-modal', 
                title: 'Informasi Transaksi',
                data: transaction
              }
            })}
          >
            <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Lihat Transaksi
          </button>
        </div>
      </div>
    </div>
  )
}