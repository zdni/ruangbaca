import { UserPlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

import { Button } from '../components/atoms'
import { UserCard } from '../components/cards'

import { useAppContext } from '../context/appContext'

export const Users = () => {
  const { data, displayModal, getUsers } = useAppContext()
  const { users } = data

  useEffect(() => {
    getUsers({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Button text='Tambah Pengguna' onClick={() => displayModal({
        modal: {
          id: 'add-user-modal', 
          title: 'Tambah Pengguna'
        }
      })}>
        <UserPlusIcon className="mr-2 h-4 w-4 cursor-pointer" />
      </Button>
      <div className='flex justify-between flex-row mb-2 mt-5 items-end'>
        <p className="font-medium">
          Pengguna
        </p>
        <p className='text-xs text-gray-500'>
          <button className='hover:underline' onClick={() => displayModal({
            modal: {
              id: 'filter-user-modal', 
              title: 'Filter Pengguna'
            }
          })}>
            Filter Pengguna
          </button>
        </p>
      </div>
      <div className='items-center flex flex-row flex-wrap gap-3'>
        {(users && users.map((user) => (
          <UserCard user={user} key={user._id} />
        )) )}
      </div>
    </>
  )
}