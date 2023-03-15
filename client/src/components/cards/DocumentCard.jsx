import {
  BookmarkIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"

export const DocumentCard = ({ document }) => {
  return (
    <div className="border-[1px] h-[182px] rounded-lg shadow w-[420px] flex">
      <img src="https://images.unsplash.com/photo-1608241561423-d65165321829" className="w-2/5 rounded object-cover" alt='cover' />
      <div className="w-full py-5 px-3 flex flex-col justify-between">
        <div className=''>
          <p className="h-[16px] text-xs font-light text-secondary truncate overflow-hidden mb-2">
          {(
            document.categoryId 
              && 
              <Link to={{
                pathname: '/documents',
                search: `?categoryId=${document.categoryId._id}`
              }} className='hover:underline'>
                <span className="flex flex-row gap-2">
                  <BookmarkIcon className='h-4 w-4 text-secondary' />
                  <span className='max-w-[200px]'>{document.categoryId.name}</span>
                </span>
              </Link>
          )}
          </p>
          <Link to={{
            pathname: '/document',
            search: `id=${document._id}`
          }} className='hover:underline'>
            <p className="font-medium text-sm text-gray-900 line-clamp-2 h-10 max-w-[227px]">
              {document.title}
            </p>
          </Link>
        </div>
        <div className="mb-3 mt-1 flex items-center">
          <div className="flex-shrink-0">
            <UserIcon className='h-4 w-4' />
          </div>
          <div className="ml-3">
            <p className="text-xs font-normal text-gray-900 line-clamp-1 max-w-[227px]">
              {document.writer}
            </p>
            <div className="flex text-xs text-gray-500">
              <time dateTime="2020-03-16">
                {document.year}
              </time>
            </div>
          </div>
        </div>
        <div className="justify-center text-left">
          <Link
            to={{
              pathname: '/document',
              search: `id=${document._id}`
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
          >
            <EyeIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Lihat Dokumen
          </Link>
        </div>
      </div>
    </div>
  )
}