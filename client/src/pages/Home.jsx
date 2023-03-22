import { CarouselDocuments } from '../components/sliders/CarouselDocuments'
import item from '../assets/images/item.svg'
import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

export const Home = () => {
  const { data, getDocuments, isLoading } = useAppContext()
  const { documents } = data

  useEffect(() => {
    getDocuments({
      limit: 10
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {(
        !isLoading
          &&
        <>
          <div className='mb-12 flex flex-col px-6 rounded-lg'>
            <div className='w-full'>
              <p className='text-xl font-bold'>
                Hai, Selamat Datang di Website Ruang Baca TI UHO 👋
              </p>
              <p className="mt-2 text-xs italic text-gray-500">
                “Buku-buku terbaik… adalah yang memberi tahu kamu apa yang sudah kamu ketahui.” – George Orwell, 1984
              </p>
            </div>
            <div className='w-full'>
              <img src={item} alt="item" />
            </div>
          </div>
          <CarouselDocuments documents={documents} />
        </>
      )}
    </>
  )
}