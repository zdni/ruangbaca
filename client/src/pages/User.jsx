import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DetailUserCard } from '../components/cards'
import { useAppContext } from '../context/appContext'

export const User = () => {
  const { data, getUser } = useAppContext()
  const { user } = data
  
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const userId = searchParams.get('id')
    getUser({
      userId
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center">
      {(
        user &&
        <DetailUserCard />
      )}
    </div>
  )
}