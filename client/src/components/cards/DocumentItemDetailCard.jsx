export const DocumentItemDetailCard = ({ title, value }) => {
  return (
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  )
}