import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { 
  Button,
  InputFile,
  InputNumber,
  InputText,
  Select,
} from "../components/atoms"

import { useAppContext } from '../context/appContext'

export const DocumentForm = () => {
  const { changeFormValue, createDocument, data, documentTypeOptions, form, getMasterData } = useAppContext()
  const { document } = form
  const { categories, specializations, storages } = data

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

    // let data = {
    //   category: document.category,
    //   code: document.code,
    //   title: document.title,
    //   writer: document.writer,
    //   year: document.year,
    //   stock: document.stock,
    //   storageId: document.storageId || storages[0]._id
    // }
    
    // if( document.category === 'book' ) {
    //   data['categoryId'] = document.categoryId || categories[0]._id
    //   data['publisher'] = document.publisher
    // } else if( document.category === 'theses' ) {
    //   data['studentIdNumber'] = document.studentIdNumber
    //   data['specializationId'] = document.specializationId || specializations[0]._id
    //   data['mentor'] = {
    //     main: document.mentorMain,
    //     second: document.mentorSecond,
    //   }
    //   data['examiner'] = {
    //     main: document.examinerMain,
    //     second: document.examinerSecond,
    //     third: document.examinerThird,
    //   }
    // }

    if(form.state === 'create') {
      createDocument({
        form: formData
      })
    }
  }

  useEffect(() => {
    getMasterData()
  })

  const navigate = useNavigate()

  return (
    <form className='flex flex-col gap-1' encType="multipart/form-data">
      <div className="flex flex-row gap-2">
        <Select 
          handleChange={handleChange}
          id='category' 
          label='Tipe Dokumen' 
          options={documentTypeOptions} 
          selectedValue={document.category}
          keyText='text'
          keyValue='value'
        />
        <InputText 
          handleChange={handleChange}
          id='code' 
          label='Kode Dokumen' 
          value={document.code}
        />
      </div>
      <InputText
        handleChange={handleChange} 
        id='title' 
        label='Judul Dokumen' 
        value={document.title}
      />
      <InputText
        handleChange={handleChange} 
        id='writer' 
        label='Penulis' 
        value={document.writer}
      />
      <div className="flex flex-row gap-2">
        <InputText 
          handleChange={handleChange}
          id='year' 
          label='Tahun Terbit' 
          value={document.year}
        />
        <InputNumber 
          handleChange={handleChange}
          id='stock'
          label='Stok'
          placeholder="Stok Dokumen"
          value={document.stock}
        />
      </div>
      {(
        document.category === 'book'
          &&
        <div className="my-4">
          <InputText
            handleChange={handleChange} 
            id='publisher' 
            label='Penerbit' 
            value={document.publisher}
          />
          <Select 
          handleChange={handleChange}
          id='categoryId' 
          label='Kategori Buku' 
          options={categories}
          selectedValue={document.categoryId || ''}
          keyText='name'
          keyValue='_id' 
        />
        </div>
      )}
      {( 
        document.category === 'theses' 
          && 
        <div className="my-4">
          <div className="flex flex-row gap-2">
            <InputText
              handleChange={handleChange} 
              id='studentIdNumber' 
              label='NIM' 
              value={document.studentIdNumber}
            />
            <Select 
              handleChange={handleChange}
              id='specializationId' 
              label='Peminatan' 
              options={specializations}
              selectedValue={document.specializationId || ''} 
              keyText='name'
              keyValue='_id'
            />
          </div>
          <InputText
            handleChange={handleChange} 
            id='mentorMain' 
            label='Pembimbing Utama' 
            value={document.mentorMain}
          />
          <InputText
            handleChange={handleChange} 
            id='mentorSecond' 
            label='Pembimbing Kedua' 
            value={document.mentorSecond}
          />
          <InputText
            handleChange={handleChange} 
            id='examinerMain' 
            label='Penguji Utama' 
            value={document.examinerMain}
          />
          <InputText
            handleChange={handleChange} 
            id='examinerSecond' 
            label='Penguji Kedua' 
            value={document.examinerSecond}
          />
          <InputText
            handleChange={handleChange} 
            id='examinerThird' 
            label='Penguji Ketga' 
            value={document.examinerThird}
          />
        </div> 
      )}
      <Select 
        handleChange={handleChange}
        id='storageId' 
        label='Lokasi Penyimpanan' 
        options={storages}
        selectedValue={document.storageId || ''} 
        keyText='name'
        keyValue='_id'
      />
      <InputFile
        id='cover' 
        label='Cover' 
        handleChange={handleChangeFile}
      />
      <div className="mt-4">
        <Button text='Tambah Dokumen' type="submit" onClick={handleSubmit} />
        <Button 
          text='Kembali' 
          isPrimary={false}
          onClick={() => {
            navigate('/documents')
          }}
        />
      </div>
    </form>
  )
}