import { Link } from "react-router-dom"
import { Badge, Button } from "../components/atoms"

import { DocumentItemDetailCard } from "../components/cards"

import { useAppContext } from "../context/appContext"
import { DOCUMENT_FORM_LINK } from "../utils/links"

export const Document = () => {
  const { displayModal } = useAppContext()
  return (
    <>
      <p>Detail Dokumen</p>
      <img src="https://images.unsplash.com/photo-1608241561423-d65165321829" className="max-h-[160px] w-full rounded-lg object-cover mt-3" alt='cover' />
      <div className="mt-4 flex flex-row gap-2 items-start">
        <Badge text='Stok Tersedia' borderColor='border-teal-600' />
        <Badge text='Kode: 201510039' borderColor='border-teal-600' />
      </div>
      <p className="mt-1">Perbandingan Algoritma AES ( Advanced Encryption Standard) Dan Algoritma Blowfish Aplikasi Enskripsi Dan Dekripsi Video .MPG</p>
      <div className="mt-4 text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
        <DocumentItemDetailCard title="Kategori Dokumen" value="Komputer Berbasis Jaringan"/>
        <DocumentItemDetailCard title="Penulis" value="FAUZIAH IKA MAHARDIKA"/>
        <DocumentItemDetailCard title="NIM" value="E1E110039"/>
        <DocumentItemDetailCard title="Tahun Lulus" value="2015"/>
      </div>
      <p className="mt-4 mb-1 text-sm font-medium">Daftar Dosen</p>
      <div className="text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
        <DocumentItemDetailCard title="Dosen Pembimbing Utama" value="Komputer Berbasis Jaringan"/>
        <DocumentItemDetailCard title="Dosen Pembimbing Kedua" value="Perpustakaan"/>
        <DocumentItemDetailCard title="Dosen Penguji Utama" value="FAUZIAH IKA MAHARDIKA"/>
        <DocumentItemDetailCard title="Dosen Penguji Kedua" value="E1E110039"/>
        <DocumentItemDetailCard title="Dosen Penguji Ketiga" value="2015"/>
      </div>
      <p className="mt-4 mb-1 text-sm font-medium">Daftar Stok</p>
      <div className="text-sm px-4 py-8 rounded-md border-[1px] flex flex-col gap-4">
        <DocumentItemDetailCard title="Perpustakaan" value="1 Buah"/>
      </div>
      <div className="flex flex-row gap-3 mt-4">
        <Link className='w-full' to={{
          pathname: DOCUMENT_FORM_LINK.path,
          search: '?mode=edit'
        }} >
          <Button text='Edit' />
        </Link>
        <Button 
          onClick={() => displayModal('delete-data-modal', 'Hapus Data')}
          text='Hapus' 
          isPrimary={false} 
        />
      </div>
      <div className="mt-4">
        <Button text='Ajukan Peminjaman' />
      </div>
    </>
  )
}