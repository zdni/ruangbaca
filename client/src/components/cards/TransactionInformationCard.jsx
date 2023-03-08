import {
  CalendarIcon,
  EyeIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { Badge } from '../atoms'
import { DocumentCard } from './DocumentCard'

import { useModalContext } from '../../context/ModalContext'

export const TransactionInformationCard = ({ title }) => {
  const { showModal } = useModalContext()
  return (
    <DocumentCard>
      <div className="py-6 px-3 flex flex-col justify-between">
        <div>
          <Badge text='Status' bgColor='bg-emerald-300'>
            <TagIcon className='h-4 w-4 stroke-[1px]' />
          </Badge>
          <Link
            to={{
              pathname: '/document'
            }}
            className="mt-2 block hover:underline"
          >
            <p className="font-medium text-sm text-gray-900 line-clamp-2">
              {title}
            </p>
          </Link>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex-shrink-0">
            <CalendarIcon className='h-6 w-6' />
          </div>
          <div className="ml-3">
            <p className="text-xs font-semibold text-gray-900">
              Tanggal Pengembalian
            </p>
            <div className="flex text-xs text-gray-500">
              <time dateTime="2020-03-16">
                Tanggal
              </time>
            </div>
          </div>
        </div>
        <div className="mt-4 items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-gray-500 hover:text-white"
            onClick={() => showModal('transaction-modal', 'Informasi Transaksi')}
          >
            <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Lihat Transaksi
          </button>
        </div>
      </div>
    </DocumentCard>
  )
}