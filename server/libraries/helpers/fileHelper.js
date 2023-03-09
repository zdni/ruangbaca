import multer from "multer"

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
  }),
  limits: {
    fieldSize: 1000000
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      )
    }
    cb(undefined, true)
  }
})

export default upload