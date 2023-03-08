import classNames from "classnames"

export const Badge = ({
  borderColor = '',
  bgColor = '',
  children,
  text,
}) => {
  const classes = classNames(
    'text-xs font-light border-[1px] px-2 py-1 rounded-md inline-block',
    borderColor,
    bgColor,
  )
  return (
    <p className={classes}>
      <span className="flex flex-row gap-2">
        {children}
        {text}
      </span>
    </p>
  )
}