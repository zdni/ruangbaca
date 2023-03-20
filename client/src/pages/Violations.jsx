import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import { TransactionInformationCard } from "../components/cards"
import { useAppContext } from "../context/appContext"

export const Violations = () => {
  const [searchParams] = useSearchParams()
  const { data, getTransactions, user } = useAppContext()
  const { transactions } = data

  useEffect(() => {
    let userId = searchParams.get('userId') ? searchParams.get('userId') : user._id

    let query = ''
    if( user.role !== 'admin' ) {
      query = `userId=${userId}&status=late`
    }
    getTransactions({ query })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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