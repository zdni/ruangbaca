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
  const { displayModal, isLoading, user } = useAppContext()

  return (
    <>
      {(
        !isLoading
          &&
        <div className="border-[1px] h-[200px] rounded-lg shadow w-[420px] flex">
          <img src={transaction.documentId.cover} onError={(e) => {e.target.src = 'http://localhost:3001/book.jpg'}} className="w-2/5 rounded object-cover" alt='cover' />
          <div className="py-6 px-3 flex flex-col justify-between">
            <div>
              <Badge text={statuses[transaction.status]} bgColor='bg-default' />
              <Link
                to={{
                  pathname: '/document',
                  search: `id=${transaction.documentId._id}`
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
                  Batas Pengembalian
                </p>
                <div className="flex text-xs text-gray-500">
                  <time dateTime={moment(transaction.endDate).format('LL')}>
                    {moment(transaction.endDate).format('LL')}
                  </time>
                </div>
              </div>
            </div>
            <div className="mt-4 items-stretch justify-center grid grid-cols-2 gap-3">
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
              {(
                user.role === 'admin'
                  &&
                <>
                  {(
                    transaction.status === 'approve'
                      &&
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
                      onClick={() => displayModal({
                        modal: {
                          id: 'penalty-modal', 
                          title: 'Buat Sanksi Keterlambatan',
                          data: transaction
                        }
                      })}
                    >
                      <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
                      Buat Sanksi
                    </button>
                  )}
                  {(
                    transaction.status === 'late_done'
                      &&
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
                      onClick={() => displayModal({
                        modal: {
                          id: 'transaction-modal', 
                          title: 'Selesaikan Sanksi',
                          data: transaction
                        }
                      })}
                    >
                      <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
                      Selesaikan Sanksi
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}