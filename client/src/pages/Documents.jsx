import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import { DocumentPlusIcon } from "@heroicons/react/24/outline"

import { Button } from "../components/atoms"
import { DocumentCard } from "../components/cards"

import { useAppContext } from '../context/appContext'
import { DOCUMENT_FORM_LINK } from "../utils/links"

export const Documents = () => {
  const { data, displayModal, getDocuments, isLoading, user } = useAppContext()
  const { documents } = data
  const [searchParams] = useSearchParams()

  useEffect(() => {
    let query = ''
    for (const entry of searchParams.entries()) {
      query += `${entry[0]}=${entry[1]}&`
    }

    getDocuments({
      query 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <>
      {(
        !isLoading
          &&
        <>
          {(
            user.role === 'admin'
              &&
            <Link to={{pathname: DOCUMENT_FORM_LINK.path}}>
              <Button text='Tambah Dokumen' >
                <DocumentPlusIcon className='h-6 w-6' />
              </Button>
            </Link>
          )}
          <div className='flex flex-col justify-between sm:flex-row mb-2 mt-3 items-end'>
            <p className="font-medium">
              Semua Dokumen
            </p>
            <p className='text-xs text-gray-500'>
              <button className='hover:underline' onClick={() => displayModal({
                modal: {
                  id: 'search-modal', 
                  title: 'Pencarian Lanjutan'
                }
              })}>
                Filter Dokumen
              </button>
            </p>
          </div>
          <div className='items-center flex flex-row flex-wrap gap-3'>
            {(documents && documents.map((item) => (
              <DocumentCard 
                document={item}
                key={item._id}
              />
            )))}
          </div>
        </>
      )}
    </>
  )
}