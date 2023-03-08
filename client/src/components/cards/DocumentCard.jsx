import { DocumentCoverImage } from '../atoms'

export const DocumentCard = ({children}) => {
  return (
    <div className="border-[1px] rounded-lg shadow min-w-[420px] max-w-[420px] flex">
      <DocumentCoverImage />
      {children}
    </div>
  )
}