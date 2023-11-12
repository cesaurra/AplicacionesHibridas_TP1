import yup from 'yup'

export const judgeCreateSchema = yup.object({
  name: yup.string().min(5, "Envia mas de 5 letras").required(),
  description: yup.string().min(5).required()
})

export const judgeUpdateSchema = yup.object({
  name: yup.string().min(5, "Envia mas de 5 letras"),
  description: yup.string().min(5)
})