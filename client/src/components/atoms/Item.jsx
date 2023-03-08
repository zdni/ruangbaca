export const Item = ({
  infoTitle,
  description,
  children,
  url
}) => {
  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="mt-2 text-left ">
          <p className="leading-none">{infoTitle}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}