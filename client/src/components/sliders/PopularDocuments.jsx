import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { DocumentInformationCard } from '../cards'

export const PopularDocuments = ({ documents }) => {
  const [width, setWidth] = useState(0)
  const carousel = useRef(null)

  useEffect(() => {
    if(carousel.current) {
      setWidth( carousel.current.scrollWidth - carousel.current.offsetWidth )
    }
  }, [documents])

  return (
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
      <motion.div ref={carousel} className='overflow-hidden cursor-grab pb-1' whileTap={{cursor: "grabbing"}}>
        <motion.div 
          drag='x' 
          dragConstraints={{right: 0, left: -width}} 
          className='flex flex-row gap-3'
        >
          {(documents && documents.map((item) => (
            <DocumentInformationCard 
              title={item.title} 
              key={item._id}
              id={item._id}
            />
          )))}
        </motion.div>
      </motion.div>
    </div>
  )
}