export const Select = ({
  handleChange,
  id, 
  label, 
  options, 
  selectedValue = ''
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {(label && <label className='text-sm text-gray-800' htmlFor={id}>{label}</label>)}
      <select 
        value={selectedValue}
        className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' 
        id={id}
        onChange={handleChange} 
        name={id} 
      >
        {(options && options.map(({value, text}) => 
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
    </div>
  )
}