export const InputPassword = ({
  handleChange,
  id, 
  isShow = false,
  label, 
  placeholder = '',
  value = '' 
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {(label && <label className='text-sm text-gray-800' htmlFor={id}>{label}</label>)}
      <input 
        className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' 
        id={id} 
        name={id}
        onChange={handleChange} 
        placeholder={placeholder} 
        type={ isShow ? "text" : "password" }
        value={value} 
      />
    </div>
  )
}

// InputPassword.defaultProps = {
//   isShow: false,
// }