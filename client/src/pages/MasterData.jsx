import { Tab } from "@headlessui/react"
import { PlusIcon } from '@heroicons/react/24/outline'

import { Button } from "../components/atoms"
import { DataCard } from "../components/cards"
import { classNames } from '../utils/classNames'

import { useAppContext } from '../context/appContext'
import { useEffect } from "react"

export const MasterData = () => {
  const { categories, displayModal, getMasterData } = useAppContext()
  
  const tabs = ['Kategori Buku', 'Peminatan Jurusan', 'Lokasi Penyimpanan']

  useEffect(() => {
    getMasterData()
  }, [])
  
  
  return (
    <>
      <Button text='Tambah Data' onClick={() => {displayModal('form-master-data-modal', 'Tambah Data')}}>
        <PlusIcon className="mr-2 h-4 w-4 cursor-pointer" />
      </Button>
      <div className="w-full py-6 sm:px-0">
        <Tab.Group
          onChange={(index) => {
            console.log('index: ', index)
          }}
        >
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {(tabs.map((value) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                  selected
                  ? 'bg-white shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-white'
                )
              }
              key={value}
            >
              {value}
            </Tab>
          )))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <DataCard items={categories}/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}