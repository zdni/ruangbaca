export const Select = ({
  handleChange,
  id, 
  label, 
  options, 
  selectedValue = '',
  keyText='',
  keyValue='',
  optionAll=false
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {(label && <label className='text-sm' htmlFor={id}>{label}</label>)}
      <select 
        value={selectedValue}
        className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' 
        id={id}
        onChange={handleChange} 
        name={id} 
      >
        {(
          optionAll 
            &&
          <option key='all' value=''>Semua</option>
        )}
        {(options && options.map((option) => 
          <option key={option[keyValue]} value={option[keyValue]}>{option[keyText]}</option>
        ))}
      </select>
    </div>
  )
}