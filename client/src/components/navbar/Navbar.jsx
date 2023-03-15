import {
  Bars3BottomRightIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

import { useAppContext } from '../../context/appContext'
import { MENU_TITLE, APP_TITLE } from '../../constants/string'
import { HOME_LINK } from '../../utils/links'

export const Navbar = () => {
  const { displayModal } = useAppContext();

  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <Link to={{pathname: HOME_LINK.path}} className="text-xl font-bold">{APP_TITLE}</Link>
        <div className='flex flex-row gap-5'>
          <div className="flex">
            <MagnifyingGlassIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => displayModal({
                modal: {
                  id: 'search-modal', 
                  title: 'Pencarian Lanjutan'
                }
              })}
            />
          </div>
          <div className="right-icons">
            <InformationCircleIcon
              className="mr-3 h-6 w-6 cursor-pointer"
              onClick={() => displayModal({
                modal: {
                  id: 'info-modal', 
                  title: 'Informasi Kontak'
                }
              })}
            />
            <Bars3BottomRightIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => displayModal({modal: {
                id: 'menu-modal', 
                title: MENU_TITLE
              }})}
            />
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}