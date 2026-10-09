// Campo "¿Qué te interesa?" del formulario de contacto.
// - La clave es el valor que envía el formulario (los textos visibles están en
//   src/locales/es.json → contacto.form.interestOptions).
// - label: texto con el que aparece en el email de aviso.
// - tagId: etiqueta de Systeme que se añade al contacto, además de
//   SYSTEME_BASE_TAG_ID. Si es null, se omite sin romper el envío.

export const SYSTEME_BASE_TAG_ID = 2049193;

export const INTERESTS = {
  one:           { label: "Web One",                      tagId: null }, // #PENDIENTE-systeme-tag-one
  multi:         { label: "Web Multi",                    tagId: null }, // #PENDIENTE-systeme-tag-multi
  custom:        { label: "Web Custom",                   tagId: null }, // #PENDIENTE-systeme-tag-custom
  bond:          { label: "Plataforma Bond",              tagId: null }, // #PENDIENTE-systeme-tag-bond
  mantenimiento: { label: "Mantenimiento (Basic o Plus)", tagId: null }, // #PENDIENTE-systeme-tag-mantenimiento
  nose:          { label: "Aún no lo sé",                 tagId: null }, // #PENDIENTE-systeme-tag-nose
};

// Orden de las opciones en el desplegable
export const INTEREST_VALUES = Object.keys(INTERESTS);
