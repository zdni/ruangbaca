export const InputFile = ({
  handleChange,
  id, 
  label, 
  placeholder = '',
  // value = ''
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {(label && <label className='text-sm text-gray-800' htmlFor={id}>{label}</label>)}
      <input 
        className='mt-1 block w-full border-transparent' 
        id={id} 
        name={id} 
        onChange={handleChange}
        placeholder={placeholder} 
        type="file" 
        // value={value}
      />
    </div>
  )
}