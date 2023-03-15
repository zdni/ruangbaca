import { Button } from '../atoms'
import { BaseModal } from './BaseModal'
import { useAppContext } from '../../context/appContext'

import moment from 'moment'

import { InputDate } from '../atoms'

export const ApplyTransactionModal = () => {
  const { changeFormValue, createTransaction, form, modal } = useAppContext()

  const handleChange = (e) => {
    const add7daysToStartDate = moment(e.target.value, "YYYY-MM-DD").add(7, 'days')
    const day = add7daysToStartDate.format('DD')
    const month = add7daysToStartDate.format('MM')
    const year = add7daysToStartDate.format('YYYY')
    
    changeFormValue({
      key: 'transaction',
      value: {
        ...form.transaction,
        endDate: `${year}-${month}-${day}`,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    createTransaction({
      form: {
        userId: modal.data.userId,
        documentId: modal.data.id,
        startDate: form.transaction.startDate,
        endDate: form.transaction.endDate,
      }
    })
  }
  
  return (
    <BaseModal isOpen={modal.id === 'apply-transaction-modal'}>
      {(
        modal && modal.data
          &&
        <form action="" className='mt-5 flex flex-col gap-1'>
          <p className='text-sm font-medium'>Ajukan peminjaman untuk dokumen</p>
          <p className='text-sm font-bold mb-4'>{modal.data.title}</p>
          <InputDate 
            id='startDate'
            label='Tanggal Peminjaman'
            handleChange={handleChange}
            value={form.transaction.startDate}
          />
          <div className="mt-8 items-stretch justify-center text-left">
            <Button text='Ajukan Peminjaman' type='submit' onClick={handleSubmit} />
          </div>
        </form>
      )}
    </BaseModal>
  )
}