import { createContext, useContext, useState } from "react";

const defaultDataContext = {
  categories: [],
  // document: [],
  documents: [],
  locations: [],
  // popularDocuments: [],
  // transactions: [],
  types: [],
  // user: [],
  // users: [],
  // violations: [],
}

const DataContext = createContext(defaultDataContext)
DataContext.displayName = 'DataContext'

export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({children}) => {
  const [categories] = useState(
    [{value: 'all', text: 'Semua Kategori'}, {value: 'tes', text: 'Aplikasi Perkantoran'}]
  )
  const [documents] = useState([])
  const [locations] = useState(
    [{value: 'all', text: 'Semua Lokasi'}, {value: 'tes', text: 'Aplikasi Perkantoran'}]
  )
  const [types] = useState(
    [{value: 'all', text: 'Semua Dokumen'}, {value: 'library', text: 'Perpustakaan'}]
  )

  return (
    <DataContext.Provider
      value={{
        categories,
        documents,
        locations,
        types
      }}
    >
      {children}
    </DataContext.Provider>
  )
}