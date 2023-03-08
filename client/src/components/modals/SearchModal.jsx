import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, DocumentIcon } from '@heroicons/react/24/outline'

import { 
  Button,
  InputSearch,
  Select,
} from "../atoms"
import { BaseModal } from './BaseModal'

import { useAppContext } from "../../context/appContext"

const initialState = {
  category: 'all',
  documentType: 'all',
  isDisabled: true,
  keyword: '',
  location: 'all',
}

export const SearchModal = () => {
  const { clearModal, modalId } = useAppContext()
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  
  const types = [{value: 'all', text: 'Semua Dokumen'}, {value: 'book', text: 'buku'}]
  const categories = [{value: 'all', text: 'Semua Kategori'}, {value: 'tes', text: 'Aplikasi Perkantoran'}]
  const locations = [{value: 'all', text: 'Semua Lokasi'}, {value: 'library', text: 'Perpustakaan'}]
  
  useEffect(() => {
    let value = values.keyword === '' ? true : false
    setValues({
      ...values,
      isDisabled: value
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.keyword])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    clearModal()
    return navigate(`/documents?keyword=${values.keyword}&category=${values.category}&location=${values.location}&type=${values.documentType}`)
  }

  return (
    <BaseModal isOpen={modalId === 'search-modal'}>
      <form>
        <div className='mt-5 flex flex-col gap-1'>
          <InputSearch 
            handleChange={handleChange}
            id='keyword' 
            placeholder='Masukkan Judul Dokumen'
            value={values.keyword} 
          />
          <Select 
            handleChange={handleChange}
            id='documentType' 
            options={types} 
            selectedValue={values.documentType}
          />
          <Select 
            handleChange={handleChange}
            id='category' 
            options={categories}
            selectedValue={values.category} 
          />
          <Select 
            handleChange={handleChange}
            id='location' 
            options={locations}
            selectedValue={values.location} 
          />
        </div>
        <div className="mt-8 items-stretch justify-center text-left">
          <Button text='Terapkan' type='submit' onClick={handleSubmit} isDisabled={values.isDisabled}>
            <MagnifyingGlassIcon className="mr-2 h-6 w-6 cursor-pointer" />
          </Button>
        </div>
      </form>
      <div className="mt-2 items-stretch justify-center text-left">
        <Button 
          isPrimary={false} 
          text='Lihat Semua Dokumen'
          onClick={() => {
            clearModal()
            navigate('/documents')
          }}
        >
          <DocumentIcon className="mr-2 h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </BaseModal>
  )
}