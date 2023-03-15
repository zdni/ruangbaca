import {
  AtSymbolIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

import { Item } from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

import { 
  APP_DESCRIPTION_TEXT,
  LOCATION_TEXT,
  EMAIL,
  PHONE,
} from '../../constants/string'

export const InfoModal = () => {
  const { modal } = useAppContext()
  return (
    <BaseModal isOpen={modal.id === 'info-modal'}>
      <p className="text-sm text-gray-500 dark:text-gray-300">{APP_DESCRIPTION_TEXT}</p>
      <div className="mt-2 flex flex-col divide-y">
        <Item 
          infoTitle='Lokasi'
          description={LOCATION_TEXT}
        >
          <MapPinIcon className='h-6 w-6' />
        </Item>
        <Item 
          infoTitle='Email'
          description={EMAIL}
        >
          <AtSymbolIcon className='h-6 w-6' />
        </Item>
        <Item 
          infoTitle='Telepon'
          description={PHONE}
        >
          <PhoneIcon className='h-6 w-6' />
        </Item>
      </div>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        - Buku adalah Jendela Dunia -
      </p>
    </BaseModal>
  )
}
