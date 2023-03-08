import { UserPlusIcon } from '@heroicons/react/24/outline'

import { Button } from '../components/atoms'
import { UserCard } from '../components/cards'

import { useAppContext } from '../context/appContext'

export const Users = () => {
  const { displayModal } = useAppContext()

  return (
    <>
      <Button text='Tambah Pengguna' onClick={() => displayModal('add-user-modal', 'Tambah Pengguna')}>
        <UserPlusIcon className="mr-2 h-4 w-4 cursor-pointer" />
      </Button>
      <div className='flex justify-between flex-row mb-2 mt-5 items-end'>
        <p className="font-medium">
          Pengguna
        </p>
        <p className='text-xs text-gray-500'>
          <button className='hover:underline' onClick={() => displayModal('filter-user-modal', 'Filter Pengguna')}>
            Filter Pengguna
          </button>
        </p>
      </div>
      <div className='items-center flex flex-row flex-wrap gap-3'>
        <UserCard 
          name='Al Zidni Kasim'
        />
      </div>
    </>
  )
}