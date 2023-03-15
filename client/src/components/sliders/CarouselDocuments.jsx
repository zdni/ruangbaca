import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import 'swiper/css'

import { DocumentCard } from '../cards'

export const CarouselDocuments = ({ documents }) => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between flex-row mb-2 mt-6 items-end'>
          <p className="text-sm font-semibold">
            Dokumen Terbaru
          </p>
          <p className='text-xs text-gray-500'>
            <Link to={{pathname: '/documents'}} className='hover:underline'>
              Semua Dokumen
            </Link>
          </p>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
      >
        {(documents && documents.map((item) => (
          <SwiperSlide key={item._id}>
            <DocumentCard
              document={item} 
            />
          </SwiperSlide>
        )))}
      </Swiper>
    </>
  )
}