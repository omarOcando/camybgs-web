// Campo "¿Qué te interesa?" del formulario de contacto.
// - La clave es el valor que envía el formulario (los textos visibles están en
//   src/locales/es.json → contacto.form.interestOptions).
// - label: texto con el que aparece en el email de aviso.
// - tagId: etiqueta de Systeme que se añade al contacto (la única que recibe).

export const INTERESTS = {
  one:           { label: "Web One",                      tagId: 2220930 }, // interes-web-one
  multi:         { label: "Web Multi",                    tagId: 2220931 }, // interes-web-multi
  custom:        { label: "Web Custom",                   tagId: 2220932 }, // interes-web-custom
  bond:          { label: "Plataforma Bond",              tagId: 2220933 }, // interes-bond
  mantenimiento: { label: "Mantenimiento (Basic o Plus)", tagId: 2220934 }, // interes-mantenimiento
  nose:          { label: "Aún no lo sé",                 tagId: 2220935 }, // interes-no-sabe
};

// Orden de las opciones en el desplegable
export const INTEREST_VALUES = Object.keys(INTERESTS);
