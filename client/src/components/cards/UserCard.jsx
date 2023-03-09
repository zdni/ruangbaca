import {
  ArrowPathIcon,
  EyeIcon,
  // NoSymbolIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { Badge } from '../atoms'

export const UserCard = ({ name }) => {
  return (
    <div className="bg-gray-100 rounded-md p-4 flex w-full">
      <div className='w-3/5'>
        <p>{name}</p>
        <Badge text='Mahasiswa'/>
      </div>
      <div>
        <div className="items-stretch justify-center text-left">
          <Link to={{pathname: '/user'}} >
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
            >
              <EyeIcon className="mr-1 h-3 w-3 stroke-[1px]" />
              Lihat Pengguna
            </button>
          </Link>
        </div>
        <div className="items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
          >
            <ArrowPathIcon className="mr-1 h-3 w-3 stroke-[1px]" />
            Reset Password
          </button>
        </div>
        {/* <div className="items-stretch justify-center text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent border-gray-500 px-2 py-1 text-center shadow-s text-xs hover:bg-secondary hover:text-white"
          >
            <NoSymbolIcon className="mr-2 h-4 w-4 stroke-[1px]" />
            Nonaktifkan
          </button>
        </div> */}
      </div>  
    </div>
  )
}