import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import { DocumentPlusIcon } from "@heroicons/react/24/outline"

import { Button } from "../components/atoms"
import { DocumentCard } from "../components/cards"
import { NotFoundData } from "../components/NotFoundData"

import { useAppContext } from '../context/appContext'
import { DOCUMENT_FORM_LINK } from "../utils/links"

import { Pagination } from '../components/pagination/Pagination'

let PageSize = 10

export const Documents = () => {
  const { data, displayModal, getDocuments, isLoading, user } = useAppContext()
  const { documents, totalDocuments } = data
  const [searchParams] = useSearchParams()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [firstPageIndex, setFirstPageIndex] = useState(0)
  
  useMemo(() => {
    setFirstPageIndex(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])


  useEffect(() => {
    let query = ''
    for (const entry of searchParams.entries()) {
      query += `${entry[0]}=${entry[1]}&`
    }

    getDocuments({
      page: firstPageIndex,
      limit: PageSize,
      query 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentPage])


  return (
    <>
      {(
        !isLoading
          &&
        <>
          {(
            user && user.role === 'admin'
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
          {(
            documents.length === 0
              &&
            <NotFoundData />
          )}
          <div className='items-center flex flex-row flex-wrap gap-3'>
            {(documents && documents.map((item) => (
              <DocumentCard 
                document={item}
                key={item._id}
              />
            )))}
          </div>
          <Pagination
            className="pagination-bar mt-4"
            currentPage={currentPage}
            totalCount={totalDocuments}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </>
      )}
    </>
  )
}