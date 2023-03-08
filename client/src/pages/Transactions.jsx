import { TransactionInformationCard } from "../components/cards"

export const Transactions = () => {
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
        <TransactionInformationCard 
          title='Judul Buku'
        />
      </div>
    </>
  )
}