import { useEffect } from 'react'
import { CalendarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import moment from 'moment'

import { BaseModal } from './BaseModal'
import { useAppContext } from '../../context/appContext'
import { Button } from '../atoms'

export const TransactionModal = () => {
  const statuses = {
    submission: "Pengajuan",
    approve: "Dipinjam",
    done: "Dikembalikan",
    late: "Terlambat",
    late_done: "Pengembalian Terlambat",
    paid_done: "Sanksi Diselesaikan",
    cancel: "Batal",
  }
  const { 
    createReturn, 
    data, 
    getPenalties, 
    isLoading,
    modal, 
    updatePenalty, 
    getReturns, 
    updateTransaction, 
    user 
  } = useAppContext()
  const { penalties, returns } = data


  const handleSubmit = ( form ) => {
    updateTransaction({
      form,
      id: modal.data._id
    })

    if( form.status === 'done' ) {
      createReturn({
        form: {
          transactionId: modal.data._id,
          userId: modal.data.userId._id,
          date: `${moment().format('YYYY-MM-DD')}`
        }
      })
    }
    if( form.status === 'late_done' ) {
      createReturn({
        form: {
          transactionId: modal.data._id,
          userId: modal.data.userId._id,
          date: `${moment().format('YYYY-MM-DD')}`
        }
      })
    }
    if( form.status === 'paid_done' ) {
      getPenalties({
        query: `transactionId=${modal.data._id}`
      })
      if(!isLoading) {
        if(data.penalties[0]) {
          updatePenalty({
            form: {
              status: 'done',
              paymentDate: `${moment().format('YYYY-MM-DD')}`
            },
            id: data.penalties[0]._id
          })
        }
      }
    }
  }

  useEffect(() => {
    if( modal.data ) {
      if( ['done', 'late_done', 'paid_done'].includes(modal.data.status) ) {
        getReturns({
          query: `transactionId=${modal.data._id}`
        })
      }
      if( ['late', 'late_done', 'paid_done'].includes(modal.data.status) ) {
        getPenalties({
          query: `transactionId=${modal.data._id}`
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.data])
  
  return (
    <>
      {(
        !isLoading
          &&
        <BaseModal isOpen={modal.id === 'transaction-modal'}>
          {(
            modal.id === 'transaction-modal' && modal.data && modal
              &&
            <div className="flex flex-col items-start">
              <img src={modal.data.documentId.cover} onError={(e) => {e.target.src = 'http://localhost:3001/book.jpg'}} className="m-auto max-h-[160px] rounded object-cover" alt='cover' />
              <p className="mt-10 border-[1px] px-2 py-1 text-xs font-light rounded-lg inline-block">
                  <span className="flex flex-row gap-2">
                    {statuses[modal.data.status]}
                  </span>
                </p>
              <p className='text-sm mt-2'>
                {modal.data.documentId.title}
              </p>
              <div className="w-full mt-4 grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className='h-6 w-6' />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-semibold text-gray-900">
                      Batas Pengembalian
                    </p>
                    <div className="flex text-xs text-gray-500">
                      <time dateTime={moment(modal.data.endDate).format('LL')}>
                        {moment(modal.data.endDate).format('LL')}
                      </time>
                    </div>
                  </div>
                </div>
                {(
                  returns.length > 0
                    &&
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CalendarIcon className='h-6 w-6' />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-semibold text-gray-900">
                        Tgl Pengembalian
                      </p>
                      <div className="flex text-xs text-gray-500">
                        <time dateTime={moment(returns[0].date).format('LL')}>
                          {moment(returns[0].date).format('LL')}
                        </time>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {(
                penalties.length > 0
                  &&
                <div className="flex items-center my-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className='h-6 w-6' />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-semibold text-gray-900">
                      Sanksi
                    </p>
                    <div className="flex text-xs text-left text-gray-500">
                      {penalties[0].description}
                    </div>
                  </div>
                </div>
              )}
              {(
                penalties.length > 0 && penalties[0].paymentDate
                  &&
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <CalendarIcon className='h-6 w-6' />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-semibold text-gray-900">
                      Tgl Penyelesaian Sanksi
                    </p>
                    <div className="flex text-xs text-gray-500">
                      <time dateTime={moment(penalties[0].paymentDate).format('LL')}>
                        {moment(penalties[0].paymentDate).format('LL')}
                      </time>
                    </div>
                  </div>
                </div>
              )}
              {(
                modal.data.userId._id === user._id
                  &&
                <>
                  {(
                    modal.data.status === 'submission'
                      &&
                    <Button
                      text='Batalkan' 
                      onClick={() => (
                        handleSubmit({ status: 'cancel' })
                      )}
                    />
                  )}
                </>
              )}
              {(
                user.role === 'admin'
                  &&
                <>
                  {(
                    modal.data.status === 'submission'
                      &&
                    <Button 
                      text='Setujui Peminjaman'
                      onClick={() => (
                        handleSubmit({ status: 'approve' })
                      )}
                    />
                  )}
                  {(
                    modal.data.status === 'approve'
                      &&
                    <Button 
                      text='Setujui Pengembalian'
                      onClick={() => (
                        handleSubmit({ status: 'done' })
                      )}
                    />
                  )}
                  {(
                    modal.data.status === 'late'
                      &&
                    <Button 
                      text='Setujui Pengembalian Terlambat'
                      onClick={() => (
                        handleSubmit({ status: 'late_done' })
                      )}
                    />
                  )}
                  {(
                    modal.data.status === 'late_done'
                      &&
                    <Button 
                      text='Sanksi Diselesaikan'
                      onClick={() => (
                        handleSubmit({ status: 'paid_done' })
                      )}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </BaseModal>
      )}
    </>
  )
}