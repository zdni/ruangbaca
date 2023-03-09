import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { DocumentInformationCard } from '../cards'

export const PopularDocuments = () => {
  const [width, setWidth] = useState(0)
  const carousel = useRef(null)

  useEffect(() => {
    if(carousel.current) {
      setWidth( carousel.current.scrollWidth - carousel.current.offsetWidth )
    }
  }, [])

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
          <DocumentInformationCard 
            title='Judul' 
          />
          <DocumentInformationCard 
            title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptatem est placeat non ullam quibusdam assumenda fuga, autem excepturi cum debitis rem adipisci nostrum nemo soluta sapiente, fugit vero at.'
          />
          <DocumentInformationCard 
            title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptatem est placeat non ullam quibusdam assumenda fuga, autem excepturi cum debitis rem adipisci nostrum nemo soluta sapiente, fugit vero at.'
          />
          <DocumentInformationCard 
            title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptatem est placeat non ullam quibusdam assumenda fuga, autem excepturi cum debitis rem adipisci nostrum nemo soluta sapiente, fugit vero at.'
          />
          <DocumentInformationCard 
            title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptatem est placeat non ullam quibusdam assumenda fuga, autem excepturi cum debitis rem adipisci nostrum nemo soluta sapiente, fugit vero at.'
          />
        </motion.div>
      </motion.div>
    </div>
  )
}