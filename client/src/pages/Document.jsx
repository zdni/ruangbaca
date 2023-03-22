import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Badge, Button } from "../components/atoms"

import { DocumentItemDetailCard } from "../components/cards"

import { useAppContext } from "../context/appContext"
import { DOCUMENT_FORM_LINK } from "../utils/links"

export const Document = () => {
  const { data, displayModal, getDocument, isLoading, user } = useAppContext()
  const { document } = data
  const [searchParams] = useSearchParams()
  const types = {
    book: 'Buku',
    theses: 'Skripsi',
    report: 'Laporan KP'
  }
  
  useEffect(() => {
    const id = searchParams.get('id')
    getDocument({id})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {(
        !isLoading && document
          &&
        <>
          <p>Detail Dokumen</p>
          {/* <img src={`http://localhost:3001/${document.cover}`} onError={(e) => {e.target.src = 'http://localhost:3001/book.jpg'}} className="max-h-[200px] w-full rounded-lg object-cover mt-3 outline outline-1 outline-black" alt='cover' /> */}
          <img src={document.cover} onError={(e) => {e.target.src = 'http://localhost:3001/book.jpg'}} className="max-h-[200px] w-full rounded-lg object-cover mt-3 outline outline-1 outline-black" alt='cover' />
          <div className="mt-4 flex flex-row gap-2 items-start">
            <Badge text={types[document.category]} borderColor='border-teal-600' />
            <Badge text={`Kode: ${document.code}`} borderColor='border-teal-600' />
          </div>
          <p className="mt-1">{document.title}</p>
          <div className="mt-4 text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
            <DocumentItemDetailCard title="Penulis" value={document.writer}/>
            {(
              document.category === 'book'
                &&
              <>
                <DocumentItemDetailCard title="Penerbit" value={document.publisher}/>
                <DocumentItemDetailCard title="Kategori Dokumen" value={document.categoryId.name}/>
                <DocumentItemDetailCard title="Tahun Terbit" value={document.year}/>
              </>
            )}
            {(
              document.category === 'theses'
                &&
              <>
                <DocumentItemDetailCard title="NIM" value={document.studentIdNumber}/>
                <DocumentItemDetailCard title="Tahun Lulus" value={document.year}/>
                <DocumentItemDetailCard title="Peminatan" value={document.specializationId.name}/>
              </>
            )}

          </div>
          {(
              document.category === 'theses' && document.lectures
                &&
              <>
                <p className="mt-4 mb-1 text-sm font-medium">Daftar Dosen</p>
                <div className="text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
                  <DocumentItemDetailCard title="Dosen Pembimbing Utama" value={document.lectures.mentor.main}/>
                  <DocumentItemDetailCard title="Dosen Pembimbing Kedua" value={document.lectures.mentor.second}/>
                  <DocumentItemDetailCard title="Dosen Penguji Utama" value={document.lectures.examiner.main}/>
                  <DocumentItemDetailCard title="Dosen Penguji Kedua" value={document.lectures.examiner.second}/>
                  <DocumentItemDetailCard title="Dosen Penguji Ketiga" value={document.lectures.examiner.third}/>
                </div>
              </>
            )}
          <p className="mt-4 mb-1 text-sm font-medium">Daftar Stok</p>
          <div className="text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
            <DocumentItemDetailCard title={document.storageId.name} value={`${document.stock} Buah`}/>
          </div>
          {(
            user && user.role === 'admin'
              &&
            <div className="flex flex-row gap-3 mt-4">
              <Link className='w-full' to={{
                pathname: DOCUMENT_FORM_LINK.path,
                search: `?documentId=${document._id}`
              }} >
                <Button text='Edit' />
              </Link>
              <Button 
                onClick={() => displayModal({
                  modal: {
                    id: 'delete-document-modal', 
                    title: 'Hapus Dokumen',
                    data: document
                  }
                })}
                text='Hapus' 
                isPrimary={false} 
              />
            </div>
          )}
          {(
            user && user.role !== 'admin'
              &&
            <div className="mt-4">
              <Button 
                text='Ajukan Peminjaman'
                onClick={() => displayModal({
                  modal: {
                    id: 'apply-transaction-modal', 
                    title: 'Ajukan Peminjaman',
                    data: {
                      id: document._id,
                      title: document.title,
                      userId: user._id
                    }
                  }
                })} 
              />
            </div>
          )}
        </>
      )}
    </>
  )
}