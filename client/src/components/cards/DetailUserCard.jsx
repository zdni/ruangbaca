import {
  DocumentTextIcon,
  ShieldExclamationIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import userImage from '../../assets/images/user.jpg'

import { Link } from 'react-router-dom'
import { Badge } from '../atoms'

export const DetailUserCard = ({ user }) => {
  const roles = {
    lecture: 'Dosen',
    student: 'Mahasiswa'
  }

  return (
    <div className="w-full bg-gray-50 rounded-md px-4 py-6 border-[1px]">
      <div className="flex flex-row xs:flex-col gap-3">
        <div className='_xs:max-w-[180px] xs:w-full'>
          <img className='rounded-md' src={userImage} alt="User Profile" />
        </div>
        <div className='w-full xs:flex xs:flex-row xs:justify-between gap-3'>
          <div>
            <p className="font-medium">{user.name}</p>
            <Badge text={roles[user.role]}>
                <UserIcon className='h-4 w-4 stroke-1' />
            </Badge>
          </div>
          {/* <Badge text='Aktif' /> */}
          <div>
            <Link to={{
              pathname: '/transactions',
              search: `userId=${user._id}`
            }} 
              className="mt-5 mb-1 hover:cursor-pointer p-1 items-center flex flex-row gap-2 w-[135px] border-[1px] hover:border-emerald-600 rounded-md"
            >
              <DocumentTextIcon className='w-8 h-8 stroke-1 text-emerald-600' />
              <div>
                <p>0</p>
                <p className='text-xs'>Transaksi</p>
              </div>
            </Link>
            <Link
              to={{
                pathname: '/violations',
                search: `userId=${user._id}`
              }} 
              className="mb-1 hover:cursor-pointer p-1 items-center flex flex-row gap-2 w-[135px] border-[1px] hover:border-rose-600 rounded-md"
            >
              <ShieldExclamationIcon className='w-8 h-8 stroke-1 text-rose-600' />
              <div>
                <p>0</p>
                <p className='text-xs'>Pelanggaran</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}