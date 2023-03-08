import { DocumentPlusIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

import { Button } from "../components/atoms"
import { DocumentInformationCard } from "../components/cards"

import { useAppContext } from '../context/appContext'
import { DOCUMENT_FORM_LINK } from "../utils/links"

export const Documents = () => {
  const { displayModal } = useAppContext()

  return (
    <>
      <Link to={{pathname: DOCUMENT_FORM_LINK.path}}>
        <Button text='Tambah Dokumen' >
          <DocumentPlusIcon className='h-6 w-6' />
        </Button>
      </Link>
      <div className='flex flex-col justify-between sm:flex-row mb-2 mt-3 items-end'>
        <p className="font-medium">
          Semua Dokumen
        </p>
        <p className='text-xs text-gray-500'>
          <button className='hover:underline' onClick={() => displayModal('search-modal', 'Pencarian Lanjutan')}>
            Filter Dokumen
          </button>
        </p>
      </div>
      <div className='items-center flex flex-row flex-wrap gap-3'>
        <DocumentInformationCard title='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam numquam fugit excepturi nulla. Corrupti iste deserunt ipsum inventore numquam harum sunt sit expedita voluptates iure adipisci, sint non perferendis id.' />
        <DocumentInformationCard title='Judul Buku' />
      </div>
    </>
  )
}