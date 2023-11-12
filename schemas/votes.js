import yup from "yup";

export const voteCreateSchema = yup.object({
  id_judge: yup.string("El id del juez no puede estar vacío").required(),
  id_game: yup.string("El id del juego no puede estar vacío").required(),
  //Validación para el puntaje de juez x categoría
  gameplay: yup.number()
    .min(1, "La puntuación debe ser mayor a 1")
    .max(10, "La puntuació debe ser menor a 10")
    .required(),
  art: yup.number()
    .min(1, "La puntuación debe ser mayor a 1")
    .max(10, "La puntuació debe ser menor a 10")
    .required(),
  sound: yup.number()
    .min(1, "La puntuación debe ser mayor a 1")
    .max(10, "La puntuació debe ser menor a 10")
    .required(),
  theme: yup.number()
    .min(1, "La puntuación debe ser mayor a 1")
    .max(10, "La puntuació debe ser menor a 10")
    .required(),
});