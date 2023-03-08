import {
  BookmarkIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"

import { DocumentCard } from './DocumentCard'

export const DocumentInformationCard = ({title}) => {
  return (
    <DocumentCard>
      <div className="w-full py-6 px-3 flex flex-col justify-between">
        <div>
          <p className="text-xs font-light text-teal-600 truncate overflow-hidden">
            <Link to={{
              pathname: '/documents',
              search: '?categoryId='
            }} className='hover:underline'>
              <span className="flex flex-row gap-2">
                <BookmarkIcon className='h-4 w-4 text-teal-600' />
                Kategori
              </span>
            </Link>
          </p>
          <Link to={{
            pathname: '/document',
          }} className='hover:underline'>
            <p className="font-medium text-sm text-gray-900 line-clamp-2 h-10">
              {title}
            </p>
          </Link>
        </div>
        <div className="mb-5 mt-1 flex items-center">
          <div className="flex-shrink-0">
            <UserIcon className='h-6 w-6' />
          </div>
          <div className="ml-3 truncate overflow-hidden">
            <p className="text-sm font-normal text-gray-900">
              Penulis
            </p>
            <div className="flex text-sm text-gray-500">
              <time dateTime="2020-03-16">
                Tahun
              </time>
            </div>
          </div>
        </div>
        <div className="justify-center text-left">
          <Link
            to={{
              pathname: '/document'
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-gray-500 hover:text-white"
          >
            <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Lihat Dokumen
          </Link>
        </div>
      </div>
    </DocumentCard>
  )
}