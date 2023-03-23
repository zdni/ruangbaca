import { Link } from 'react-router-dom'

import NotFoundImage from '../assets/images/404.png'
import { HOME_LINK } from '../utils/links'

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center'>
      <img
        width={160}
        className='' 
        src={NotFoundImage} 
        alt="NotFoundImage" 
      />
      <p className='text-xs'>HALAMAN TIDAK DITEMUKAN!</p>
      <p className='mt-5'>
        Kembali ke <Link 
            className='text-blue-900 font-bold' 
            to={{
              pathname: HOME_LINK.path
            }}
          >
            Beranda
          </Link>
      </p>
    </div>
  )
}