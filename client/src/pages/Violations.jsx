import { useEffect } from "react"

import { TransactionInformationCard } from "../components/cards"
import { useAppContext } from "../context/appContext"

export const Violations = () => {
  const { data, getTransactions } = useAppContext()
  const { transactions } = data

  useEffect(() => {
    getTransactions()
  })
  return (
    <>
      <div className='flex justify-between flex-row mb-2 items-end'>
        <p className="font-medium">
          Pelanggaran
        </p>
      </div>
      <div className='items-center flex flex-row flex-wrap gap-3'>
        {(
          transactions && transactions.map((transaction) => (
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