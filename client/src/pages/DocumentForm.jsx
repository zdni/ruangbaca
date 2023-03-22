import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { 
  Button,
  InputFile,
  InputNumber,
  InputText,
  Select,
} from "../components/atoms"

import { useAppContext } from '../context/appContext'

export const DocumentForm = () => {
  const [searchParams] = useSearchParams()
  const { 
    changeFormState, 
    changeFormValue, 
    createDocument, 
    data, 
    documentTypeOptions, 
    form, 
    getDocument, 
    getMasterData, 
    isLoading,
    updateDocument 
  } = useAppContext()
  const { categories, document, specializations, storages } = data

  const handleChange = (e) => {
    changeFormValue({
      key: 'document',
      value: {
        ...form.document,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handleChangeFile = (e) => {
    changeFormValue({
      key: 'document',
      value: {
        ...form.document,
        [e.target.name]: e.target.files[0]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { document } = form
    const formData = new FormData()
    formData.append('category', document.category)
    formData.append('code', document.code)
    formData.append('title', document.title)
    formData.append('writer', document.writer)
    formData.append('year', document.year)
    formData.append('stock', document.stock)
    formData.append('storageId', document.storageId || storages[0]._id)

    if ( document.category === 'book' ) {
      formData.append('categoryId', document.categoryId || categories[0]._id)
      formData.append('publisher', document.publisher)
    } else if( document.category === 'theses' ) {
      formData.append('studentIdNumber', document.studentIdNumber)
      formData.append('specializationId', document.specializationId || specializations[0]._id)
      const lectures = {
        mentor: {
          main: document.mentorMain,
          second: document.mentorSecond
        },
        examiner: {
          main: document.examinerMain,
          second: document.examinerSecond,
          third: document.examinerThird
        }
      }
      formData.append('lectures', JSON.stringify(lectures))
    }
    if ( document.cover ) {
      formData.append('cover', document.cover)
    }

    if(form.state === 'create') {
      createDocument({
        form: formData
      })
    }else if(form.state === 'update') {
      updateDocument({
        form: formData,
        id: document.id
      })
    }
  }

  useEffect(() => {
    getMasterData()
    
    if( searchParams.get('documentId') ) {
      getDocument({ id: searchParams.get('documentId') })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if( document ) {
      delete document.available
      
      document.id = document._id
      document.storageId = document.storageId._id
      if( document.category === 'book' ) {
        document.categoryId = document.categoryId._id
      }
      if( document.category === 'theses' ) {
        document.specializationId = document.specializationId._id
      }

      changeFormValue({
        key: 'document',
        value: {
          ...form.document,
          ...document,
        }
      })
      changeFormState({
        value: 'update'
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document])

  const navigate = useNavigate()

  return (
    <>
      {(
        !isLoading
          &&
        <form className='flex flex-col gap-1' encType="multipart/form-data">
          <div className="flex flex-row gap-2">
            <Select 
              handleChange={handleChange}
              id='category' 
              label='Tipe Dokumen' 
              options={documentTypeOptions} 
              selectedValue={form.document.category}
              keyText='text'
              keyValue='value'
            />
            <InputText 
              handleChange={handleChange}
              id='code' 
              label='Kode Dokumen' 
              value={form.document.code}
            />
          </div>
          <InputText
            handleChange={handleChange} 
            id='title' 
            label='Judul Dokumen' 
            value={form.document.title}
          />
          <InputText
            handleChange={handleChange} 
            id='writer' 
            label='Penulis' 
            value={form.document.writer}
          />
          <div className="flex flex-row gap-2">
            <InputText 
              handleChange={handleChange}
              id='year' 
              label='Tahun Terbit' 
              value={form.document.year}
            />
            <InputNumber 
              handleChange={handleChange}
              id='stock'
              label='Stok'
              placeholder="Stok Dokumen"
              value={form.document.stock}
            />
          </div>
          {(
            form.document.category === 'book'
              &&
            <div className="my-4">
              <InputText
                handleChange={handleChange} 
                id='publisher' 
                label='Penerbit' 
                value={form.document.publisher}
              />
              <Select 
                handleChange={handleChange}
                id='categoryId' 
                label='Kategori Buku' 
                options={categories}
                selectedValue={form.document.categoryId || ''}
                keyText='name'
                keyValue='_id' 
              />
            </div>
          )}
          {( 
            form.document.category === 'theses' 
              && 
            <div className="my-4">
              <div className="flex flex-row gap-2">
                <InputText
                  handleChange={handleChange} 
                  id='studentIdNumber' 
                  label='NIM' 
                  value={form.document.studentIdNumber}
                />
                <Select 
                  handleChange={handleChange}
                  id='specializationId' 
                  label='Peminatan' 
                  options={specializations}
                  selectedValue={form.document.specializationId || ''} 
                  keyText='name'
                  keyValue='_id'
                />
              </div>
              <InputText
                handleChange={handleChange} 
                id='mentorMain' 
                label='Pembimbing Utama' 
                value={form.document.mentorMain}
              />
              <InputText
                handleChange={handleChange} 
                id='mentorSecond' 
                label='Pembimbing Kedua' 
                value={form.document.mentorSecond}
              />
              <InputText
                handleChange={handleChange} 
                id='examinerMain' 
                label='Penguji Utama' 
                value={form.document.examinerMain}
              />
              <InputText
                handleChange={handleChange} 
                id='examinerSecond' 
                label='Penguji Kedua' 
                value={form.document.examinerSecond}
              />
              <InputText
                handleChange={handleChange} 
                id='examinerThird' 
                label='Penguji Ketga' 
                value={form.document.examinerThird}
              />
            </div> 
          )}
          <Select 
            handleChange={handleChange}
            id='storageId' 
            label='Lokasi Penyimpanan' 
            options={storages}
            selectedValue={form.document.storageId || ''} 
            keyText='name'
            keyValue='_id'
          />
          <InputFile
            id='cover' 
            label='Cover' 
            handleChange={handleChangeFile}
          />
          <div className="mt-4">
            <Button 
              text={ form.document.id === null ? 'Tambah Dokumen' : 'Simpan Perubahan'} 
              type="submit" 
              onClick={handleSubmit} 
            />
            <Button 
              text='Kembali' 
              isPrimary={false}
              onClick={() => {
                navigate('/documents')
              }}
            />
          </div>
        </form>
      )}
    </>
  )
}