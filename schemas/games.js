import yup from 'yup'

export const gameCreateSchema = yup.object({
  name: yup.string().required(),
  genre: yup.string().required(),
  members: yup.array(yup.string()).required(),
  edition: yup.number().integer().min(1).max(9999).required(),  //edition year
  deleted: yup.boolean().default(false), 
  
})

export const gameUpdateSchema = yup.object({
  name: yup.string().required(),
  genre: yup.string().required(),
  members: yup.array(yup.string()).required(),
  edition: yup.number().integer().min(1).max(9999).required(),   //edition year
  deleted: yup.boolean().default(false), 
})