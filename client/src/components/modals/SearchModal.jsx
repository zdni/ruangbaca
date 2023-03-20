import { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, DocumentIcon } from '@heroicons/react/24/outline'

import { 
  Button,
  InputSearch,
  Select,
} from "../atoms"
import { BaseModal } from './BaseModal'

import { useAppContext } from "../../context/appContext"

export const SearchModal = () => {
  const { changeFormValue, clearModal, data, documentTypeOptions, form, getMasterData, modal } = useAppContext()
  const { categories, storages } = data
  const { searchDocument } = form

  
  const navigate = useNavigate()
  
  
  const handleChange = (e) => {
    changeFormValue({
      key: 'searchDocument',
      value: {
        ...form.searchDocument,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    clearModal()
    return navigate(`/documents?title=${searchDocument.title}&category=${searchDocument.category}&categoryId=${searchDocument.categoryId}&storageId=${searchDocument.storageId}`)
  }

  useEffect(() => {
    getMasterData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BaseModal isOpen={modal.id === 'search-modal'}>
      <form>
        <div className='mt-5 flex flex-col gap-1'>
          <InputSearch 
            handleChange={handleChange}
            id='title' 
            placeholder='Masukkan Judul Dokumen'
            value={searchDocument.title} 
          />
          <Select 
            handleChange={handleChange}
            id='category' 
            options={documentTypeOptions} 
            selectedValue={searchDocument.category}
            keyText='text'
            keyValue='value'
            optionAll={true} 
          />
          <Select 
            handleChange={handleChange}
            id='categoryId' 
            options={categories}
            selectedValue={searchDocument.categoryId} 
            keyText='name'
            keyValue='_id' 
            optionAll={true} 
          />
          <Select 
            handleChange={handleChange}
            id='storageId' 
            options={storages}
            selectedValue={searchDocument.storageId} 
            keyText='name'
            keyValue='_id' 
            optionAll={true} 
          />
        </div>
        <div className="mt-8 items-stretch justify-center text-left">
          <Button text='Terapkan' type='submit' onClick={handleSubmit}>
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