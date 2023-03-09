import classNames from 'classnames'

export const Button = ({
  children,
  isDisabled = false,
  isPrimary = true,
  onClick,
  text,
  type = 'button'
}) => {
  const classes = classNames(
    "inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 gap-1",
    {
      'bg-gray-500 text-white shadow-sm hover:bg-primary': (isPrimary && !isDisabled),
    },
    {
      'bg-gray-100 text-gray-900 shadow-sm': isDisabled
    }
  )
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
      {text}
    </button>
  )
}