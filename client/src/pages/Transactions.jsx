import { useEffect } from 'react'

import { TransactionInformationCard } from "../components/cards"
import { useAppContext } from '../context/appContext'

export const Transactions = () => {
  const { data, getTransactions, user } = useAppContext()
  const { transactions } = data

  useEffect(() => {
    if( user.role === 'student' ) {
      getTransactions({
        userId: user._id
      })
    } else {
      getTransactions()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='flex flex-row justify-between mb-2 items-end'>
        <p className="font-medium">
          Transaksi
        </p>
        <p className='text-xs text-gray-500'>
          <button className='hover:underline'>
            Filter Transaksi
          </button>
        </p>
      </div>
      <div className='items-center flex flex-row flex-wrap gap-3'>
        {(
          transactions
            &&
          transactions.map((transaction) => (
            <TransactionInformationCard 
              key={transaction._id}
              transaction={transaction}
            />
          ))
        )}
      </div>
    </>
  )
}