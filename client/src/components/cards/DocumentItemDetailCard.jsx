export const DocumentItemDetailCard = ({ title, value }) => {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  )
}