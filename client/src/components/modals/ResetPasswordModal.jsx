import { Button } from '../atoms'
import { BaseModal } from './BaseModal'

import { useAppContext } from '../../context/appContext'

export const ResetPasswordModal = () => {
  const { modal, resetUserPassword } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    resetUserPassword({
      id: modal.data._id,
    })
  }

  return (
    <BaseModal isOpen={modal.id === 'reset-password-modal'}>
      <form action="" className='mt-5 flex flex-col gap-1'>
        <p className='text-sm font-medium'>Yakin ingin mereset password user ini?</p>
        <div className="mt-8 items-stretch justify-center text-left">
          <Button text='Reset Password' type='submit' onClick={handleSubmit} />
        </div>
      </form>
    </BaseModal>
  )
}