export const InputFile = ({
  id, 
  label, 
  placeholder = '',
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {(label && <label className='text-sm text-gray-800' htmlFor={id}>{label}</label>)}
      <input type="file" name={id} id={id} className='mt-1 block w-full border-transparent' placeholder={placeholder} />
    </div>
  )
}