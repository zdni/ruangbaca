import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline' 
import { Link } from 'react-router-dom'

import { BaseModal } from './BaseModal'
import { Button, Item } from '../atoms'
import { 
  LOGIN_BUTTON_TEXT, 
  LOGIN_DESCRIPTION_TEXT,
  LOGOUT_TEXT, 
} from '../../constants/string'
import {
  HOME_LINK,
  MASTER_DATA_LINK,
  MY_ACCOUNT_LINK,
  TRANSACTIONS_LINK,
  USERS_LINK,
  VIOLATIONS_LINK,
} from '../../utils/links'

import { useAppContext } from "../../context/appContext"

export const MenuModal = () => {
    const { clearModal, displayModal, modal, user } = useAppContext()
    
    return (
      <BaseModal isOpen={modal.id === 'menu-modal'}>
        <div className="mt-2 flex flex-col divide-y">
          <Link className='hover:underline' to={{pathname: HOME_LINK.path}} onClick={() => clearModal()} >
            <Item infoTitle={HOME_LINK.title}/>
          </Link>
          {(
            user
              &&
            <>
              <Link className='hover:underline' to={{pathname: MY_ACCOUNT_LINK.path}} onClick={() => clearModal()} >
                <Item infoTitle={MY_ACCOUNT_LINK.title}/>
              </Link>
              <Link className='hover:underline' to={{pathname: TRANSACTIONS_LINK.path}} onClick={() => clearModal()} >
                <Item infoTitle={TRANSACTIONS_LINK.title}/>
              </Link>
              <Link className='hover:underline' to={{pathname: VIOLATIONS_LINK.path}} onClick={() => clearModal()} >
                <Item infoTitle={VIOLATIONS_LINK.title}/>
              </Link>
            </>
          )}
          <div className='mt-4'></div>
          {(
            user && user.role === 'admin'
              &&
            <>
              <Link className='hover:underline' to={{pathname: USERS_LINK.path}} onClick={() => clearModal()} >
                <Item infoTitle={USERS_LINK.title}/>
              </Link>
              <Link className='hover:underline' to={{pathname: MASTER_DATA_LINK.path}} onClick={() => clearModal()} >
                <Item infoTitle={MASTER_DATA_LINK.title}/>
              </Link>
            </>
          )}
        </div>
        <div className="mt-5 columns-2 items-stretch justify-center text-left">
          <div className="text-xs">{LOGIN_DESCRIPTION_TEXT}</div>
          {
            !user && 
            <Button text={LOGIN_BUTTON_TEXT} onClick={() => displayModal({
              modal: {
                id: 'login-modal', 
                title: 'Masuk'
            }})} >
              <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 cursor-pointer" />
            </Button>
          }
          {
            user && 
            <Button text={LOGOUT_TEXT} onClick={() => displayModal({
              modal: {
                id: 'logout-modal', 
                title: 'Keluar'
            }})} >
              <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 cursor-pointer" />
            </Button>
          }
        </div>
      </BaseModal>
    )
  }
  