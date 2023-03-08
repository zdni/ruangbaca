import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { 
  Button,
  InputFile,
  InputText,
  Select,
} from "../components/atoms"

export const DocumentForm = () => {
  const types = [
    {value: 'book', text: 'Buku'},
    {value: 'thesis', text: 'Skripsi'},
  ]
  const categories = [
    {value: 'tes', text: 'Aplikasi Perkantoran'},
  ]

  const navigate = useNavigate()

  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [code, setCode] = useState('')
  const [publisher, setPublisher] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')

  const handleAuthorChange = (e) => setAuthor(e.target.value)
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const handleCodeChange = (e) => setCode(e.target.value)
  const handlePublisherChange = (e) => setPublisher(e.target.value)
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleTypeChange = (e) => setType(e.target.value)
  const handleYearChange = (e) => setYear(e.target.value)
  
  return (
    <form action="" className='flex flex-col gap-1'>
      <div className="flex flex-row gap-2">
        <Select 
          handleChange={handleTypeChange}
          id='type' 
          label='Tipe Dokumen' 
          options={types} 
          selectedValue={type}
        />
        <InputText 
          handleChange={handleCodeChange}
          id='code' 
          label='Kode Dokumen' 
          value={code}
        />
      </div>
      <InputText
        handleChange={handleTitleChange} 
        id='title' 
        label='Judul Dokumen' 
        value={title}
      />
      <InputText
        handleChange={handleAuthorChange} 
        id='author' 
        label='Penulis' 
        value={author}
      />
      <InputFile
        id='cover' 
        label='Cover' 
      />
      <div className="mt-4"></div>
      <InputText
        handleChange={handlePublisherChange} 
        id='publisher' 
        label='Penerbit' 
        value={publisher}
      />
      <Select 
        handleChange={handleCategoryChange}
        id='category' 
        label='Kategori Buku' 
        options={categories}
        selectedValue={category} 
      />
      <InputText 
        handleChange={handleYearChange}
        id='year' 
        label='Tahun Terbit' 
        value={year}
      />
      <div className="mt-4"></div>
      <Button text='Tambah Dokumen' />
      <Button 
        text='Kembali' 
        isPrimary={false}
        onClick={() => {
          navigate('/documents')
        }}
      />
    </form>
  )
}