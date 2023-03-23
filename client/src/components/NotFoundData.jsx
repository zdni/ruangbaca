import NotFoundDataImage from '../assets/images/no-results.png'

export const NotFoundData = () => {
  return (
    <div className="flex flex-col items-center mt-5 mb-2">
      <img
        width={40} 
        src={NotFoundDataImage} 
        alt="NotFoundDataImage" 
      />
      <p className="text-xs">Tidak ada Data</p>
    </div>
  )
}