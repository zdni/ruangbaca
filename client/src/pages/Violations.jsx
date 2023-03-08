import { TransactionInformationCard } from "../components/cards"

export const Violations = () => {
  return (
    <>
      <div className='flex justify-between flex-row mb-2 items-end'>
        <p className="font-medium">
          Pelanggaran
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