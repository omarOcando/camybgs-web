# Brief: rediseño de camybgs.com (fase 1, solo español)

> Documento para Claude Code. Colócalo en la raíz del repositorio de camybgs.com y pide: "Lee BRIEF-REDISENO.md y propón un plan antes de tocar código".

## 1. Contexto

CAMY cambia de posicionamiento. Deja de presentarse como agencia de marketing y captación ("te pongo frente a ellos", "ventas reales") y pasa a ser un **estudio de diseño web creativo que comunica**: webs donde cada palabra, color, forma y movimiento expresan lo que es el negocio del cliente.

- **Slogan (fijo, va en el footer):** Tu web, reflejo de tu mensaje.
- **Titular del hero:** Tienes algo que decir. Haz que tu web lo haga sentir.
- **Productos:** webs **One · Multi · Custom**, planes mensuales **Basic · Plus**, y **Bond** (producto estrella, una plataforma aparte que se vende en su propia página de Systeme).

## 2. Forma de trabajo: sin tocar la web en línea

La web actual debe seguir funcionando igual mientras se hace el rediseño, y su versión actual debe poder recuperarse.

1. **Ya hecho por Omar:** existe la etiqueta `v1-antes-rediseno` sobre el estado actual de `master` (subida a GitHub) y la rama `rediseno-2026` (subida y conectada a `origin/rediseno-2026`). No hace falta repetirlo.
2. **Trabajar siempre en una rama nueva**, por ejemplo `rediseno-2026`. No hacer commits ni merges en `master` durante esta fase.
3. **Revisar los cambios en la vista previa** que Vercel genera automáticamente para cada rama (una URL distinta de camybgs.com).
4. **Publicar solo cuando Omar lo apruebe**: merge de la rama en `master`. Si algo falla tras publicar, se vuelve a la versión anterior desde Vercel (*Instant Rollback*) o desde la etiqueta `v1-antes-rediseno`.

## 3. Alcance de esta fase

1. **Solo español.** Todo el contenido nuevo va en español. La versión en inglés se hará después, cuando el español esté afinado.
2. **Preparar la estructura para el inglés sin crearlo todavía:** todos los textos en archivos de idioma (por ejemplo `locales/es.json` con react-i18next o el sistema que ya use el proyecto), y rutas pensadas para añadir después `/en/...`. No crear rutas ni textos en inglés en esta fase.
3. **Mantener el diseño visual actual:** colores de marca (Noche profunda #1D1D2E, Fuego CAMY #F04E23, Arena cálida #F5F0E8), tipografías y estilo de tarjetas. El vídeo de fondo del hero se sustituye por el componente AuroraMandala (ver Inicio). Cambian textos, estructura de páginas y algunas funciones.
4. **Fuera de esta fase:** migración del hosting de Vercel a Render (se hará justo después, como tarea aparte), versión en inglés, test automático "¿Tu web dice lo que eres?" y la reescritura de los textos legales.

## 4. Cambios globales

- **Menú nuevo:** Inicio · Servicios · Bond · Proyectos · Sobre mí · Contacto. Mantener el diseño actual del menú; solo cambian las entradas.
- **Footer:** logo + slogan "Tu web, reflejo de tu mensaje." + menú + Impressum · Datenschutz + email (info@camybgs.com).
- **Quitar el enlace y cualquier popup o botón al mini-audit actual** (`omar-ocando.systeme.io/mini-auditoria`). Hoy hay **dos elementos distintos**: la ventana emergente (popup) y el botón fijo flotante que aparece al hacer scroll. **Ocultar los dos, sin borrarlos**: dejarlos desactivados por configuración (un interruptor para cada uno) y con la URL del lead magnet en una sola variable, para reutilizarlos después con el nuevo test "¿Tu web dice lo que eres?" sin tocar el diseño.
- **Mantener el botón flotante de WhatsApp** (wa.me/491778587715).
- **Revisar todos los textos sueltos** (meta títulos, descripciones, textos alternativos, títulos de pestaña) para que no hablen de marketing, captación, leads o "ventas reales".

## 5. Rutas

| Ruta | Página | Notas |
|---|---|---|
| `/` | Inicio | Textos nuevos |
| `/servicios` | Servicios | Contenido nuevo completo |
| `/bond` | Bond | **Página nueva** |
| `/proyectos` | Proyectos | **Página nueva**: une Resultados y Mi trabajo |
| `/sobre-mi` | Sobre mí | Cambios pequeños |
| `/contacto` | Contacto | Cambios pequeños + campo nuevo en el formulario |
| `/impressum`, `/datenschutz` | Legales | Sin cambios de texto en esta fase |
| `/resultados`, `/mi-trabajo` | — | **Redirección permanente (301) a `/proyectos`** |

Actualizar `sitemap.xml`, los enlaces internos y la configuración de rutas del hosting actual (`vercel.json`) con las rutas nuevas y las redirecciones.

## 6. Indicaciones por página

Los textos definitivos de cada página están en el **Anexo** al final. Úsalos tal cual. Las líneas en negrita tipo **Título:**, **Botón:** o **Nota:** indican el papel de cada texto; no se muestran en la web.

### Inicio (`/`)
- Orden de secciones: 1) Hero · 2) El problema · 3) Cómo lo hago · 4) Oferta resumida · 5) Bond destacado · 6) Proyectos y testimonios en vídeo · 7) Proceso · 8) La persona detrás de CAMY · 9) Cierre.
- **Fondo del hero (nuevo):** sustituye el vídeo de fondo actual por el componente `AuroraMandala.jsx` (se entrega junto a este brief): un mandala de luces tipo aurora boreal en WebGL, fijo detrás del contenido, que aparece desde el centro y cambia suavemente con el scroll de toda la página. Usarlo tal cual, sin cambiar colores, velocidad ni movimiento (aprobado por Omar). Colocarlo una sola vez en la Home; los textos y paneles hacen scroll por encima. Comprobar que el texto del hero se lee bien y que en móvil va fluido. Si el vídeo actual ya no se usa en ninguna parte, retirarlo del proyecto.
- **Botón principal del hero "Hablemos de tu web":** al pulsarlo se despliegan las formas de contacto: WhatsApp, llamada de teléfono, Telegram y Signal. Cada opción abre la app correspondiente. Los datos de Telegram y Signal están como pendientes (ver sección 8).
- **Sección 6:** reutilizar los testimonios en vídeo actuales (Ramsés Viloria y Viva México) con los textos del anexo y el botón "Ver proyectos →" hacia `/proyectos`.
- **Sección 7 (Proceso):** sustituye al proceso actual de 4 pasos ("Atraigo esos clientes a ti…") por los 5 pasos del anexo.
- Los botones "Ver todos los detalles →" llevan a `/servicios`; "Conoce Bond →" a `/bond`; "Conoce mi historia →" a `/sobre-mi`; "Hablemos →" a `/contacto`.

### Servicios (`/servicios`)
- Sustituye por completo la página actual (6 tipos de web, marketing, paquetes Starter/Growth/Premium).
- Tres tarjetas de web (One, Multi, Custom) con: para quién, qué incluye, duración y valor.
- Tabla de pago: al contado frente a cuotas.
- Planes Basic y Plus, bloque de Bond (botón a `/bond`), preguntas frecuentes (formato acordeón) y bloque final "Así empezamos" con botón a `/contacto`.

### Bond (`/bond`) — página nueva
- Página corta. Su objetivo es presentar Bond y llevar a su página de venta en Systeme.
- **"Ver Bond en detalle →"** enlaza a la página de venta de Bond en Systeme y **"Reservar una demo"** a la reserva de la demo (ambas URL pendientes; ver sección 7). Abrir en pestaña nueva.
- Ignorar la "Nota para revisar en el proyecto de Bond" del anexo: es interna.

### Proyectos (`/proyectos`) — página nueva
- Une el contenido de las actuales Resultados y Mi trabajo.
- **Quitar:** las réplicas de Pinterest y Mercedes-Benz y los contadores (proyectos, clientes, países, años).
- **Mantener el diseño actual de las tarjetas de proyecto** (reto, lo que hice, resultado, tecnologías, botón "Ver proyecto").
- **Filtro por categorías:** Todos · One · Multi · Custom · Bond. Cada proyecto tiene una categoría (Ramsés = Custom, Viva México = Multi). **Mostrar solo las categorías que tengan al menos un proyecto** (hoy: Todos, Multi y Custom), para que ningún filtro lleve a una lista vacía. Las demás aparecen solas al añadir proyectos.
- Testimonios actuales y bloque de cierre con botón a `/contacto`.

### Sobre mí (`/sobre-mi`)
- Mantener diseño y texto actuales con los cambios del anexo: el párrafo nuevo (marcado **NUEVO:** en el anexo; quitar esa etiqueta al publicarlo), la frase "cada cliente al que ayudo a mostrarse tal como es" y la cita destacada nueva.

### Contacto (`/contacto`)
- Mantener diseño. Cambian la frase de entrada, los 4 pasos de "¿Y después qué?" y el formulario.
- **Campo nuevo en el formulario:** "¿Qué te interesa?" (desplegable) con las opciones: Una web One · Una web Multi · Una web Custom · La plataforma Bond · Mantenimiento (Basic o Plus) · Aún no lo sé.
- El valor elegido debe llegar en el email o registro que hoy genera el formulario, junto al resto de campos. Comprobar el envío de punta a punta.
- El campo "Profesión" pasa a llamarse "Profesión o negocio".

## 7. SEO

Actualizar título y descripción de cada página. Propuesta:

| Página | Título | Descripción |
|---|---|---|
| Inicio | CAMY · Diseño web que comunica | Webs creativas donde cada palabra, color, forma y movimiento expresan lo que es tu negocio. Desde 77 €/mes. |
| Servicios | Servicios y precios · CAMY | Webs One, Multi y Custom, planes de mantenimiento y pago en cuotas. Diseño a medida, SEO básico y páginas legales incluidas. |
| Bond | Bond · Gestiona tu negocio, cuida a tus clientes | La plataforma de CAMY para coaches, terapeutas y profesionales que acompañan a sus clientes: reservas, agenda, portal y pagos. |
| Proyectos | Proyectos · CAMY | Proyectos reales de diseño web y plataformas a medida. |
| Sobre mí | Sobre mí · CAMY | La historia detrás de CAMY y de Omar Ocando, diseñador web en Colonia, Alemania. |
| Contacto | Contacto · CAMY | Cuéntame tu proyecto. Respondo en menos de 24 horas, en español o en inglés. |

Actualizar también la imagen y textos Open Graph, que hoy hablan de marketing y captación de clientes.

## 8. Datos pendientes (preguntar a Omar antes de cerrar)

- Usuario o enlace de **Telegram** y de **Signal** para el botón del hero.
- URL de la **página de venta de Bond** en Systeme.
- URL para **reservar la demo** de Bond.
- Confirmar si los **vídeos de testimonios** actuales se mantienen o hay nuevos.

Mientras tanto, usar marcadores claros (por ejemplo `#PENDIENTE-telegram`) y listarlos en el resumen final.

## 9. Criterios de terminado

- Las 6 páginas muestran los textos del anexo, sin restos de los textos antiguos de marketing.
- `/resultados` y `/mi-trabajo` redirigen a `/proyectos`.
- No queda ningún enlace al mini-audit actual; el popup y el botón flotante del lead magnet están ocultos y listos para activarse.
- `master` y la web en línea no se han tocado hasta la aprobación de Omar, y existe la etiqueta `v1-antes-rediseno`.
- El filtro de Proyectos solo muestra categorías con proyectos.
- El formulario de contacto envía el campo "¿Qué te interesa?".
- El desplegable de contacto del hero funciona en móvil y en escritorio.
- El fondo AuroraMandala se ve y se mueve igual que el prototipo aprobado, también en móvil.
- Todo se ve bien en móvil, tablet (vertical y horizontal) y escritorio.
- Todos los textos están en los archivos de idioma, listos para añadir el inglés.
- Sitemap y metadatos actualizados.

---

# Anexo: textos definitivos en español

## Inicio (/)

### 1. Hero

**Titular:** Tienes algo que decir. Haz que tu web lo haga sentir.

**Subtítulo:** Webs donde cada palabra, color, forma y movimiento, expresan lo que es tu negocio.

**Botón principal:** Hablemos de tu web → se despliegan opciones: ¿cómo prefieres que hablemos? WA, llamada de teléfono, Telegram o Signal?

### 2. El problema

**Título:** ¿Te suena?

**“Mi web no expresa mi negocio.”** Tienes una web, pero quien entra no entiende a la primera qué haces ni por qué debería elegirte. Y se va sin escribirte.

**“Se ve igual que todas.”** Plantillas, fotos de stock, textos genéricos… Pero nada de eso que te hace especial aparece.

**“Me da cosa mandar el enlace.”** Sabes que tu trabajo vale más de lo que muestra tu web. Y eso te frena cada vez que alguien te pide verla.

**Cierre:** No te falta talento. Te falta mensaje...

### 3. Cómo lo hago

**Título:** Nada aparece por casualidad

**Intro:** Una web comunica, incluso antes de que alguien lea una palabra... Por eso implemento cada detalle con atención e intención.


- **Palabras.** Las palabras son nuestra herramienta principal para entendernos. Cómo se interconectan, llevan a lugares muy específicos.
- **Color.** Cada tono y combinación transmite algo: confianza, energía, calma, etc. Es muy útil apoyarse en ellos para decir eficientemente lo que quieres.
- **Forma.** Tipografías, espacios y composición que ordenan tu mensaje y guían la mirada.
- **Movimiento.** Animaciones con sentido, que introducen y acompañan a quien experimenta tu mensaje y no lo distrae.

**Cierre:** El resultado es una web que es un reflejo de tu mensaje.

### 4. Oferta resumida

**Título:** Elige cómo empezar

**One** · Una página con todo lo esencial, para presentarte con claridad. Desde 799 € o desde 77 €/mes

**Multi** · Varias páginas para contar todo tu negocio: servicios, proyectos, equipo… Desde 1.199 € o desde 115 €/mes

**Custom** · Funciones a tu medida: reservas, calendario, tienda online… Desde 1.999 € o desde 192 €/mes

**Línea común:** Todas incluyen diseño a medida, SEO básico, páginas legales y cambios ilimitados sobre el diseño aprobado. Paga de una vez o en cuotas.

**Línea de planes:** ¿Y después? Con los planes Basic y Plus tu web sigue al día, y tus clientes, bien cuidados.

**Botón:** Ver todos los detalles →

### 5. Bond destacado

**Etiqueta:** Producto estrella

**Título:** Bond. Gestiona tu negocio, cuida a tus clientes.

**Texto:** Plataforma digital para coaches, terapeutas, nutricionistas y cualquier profesional que acompaña a sus clientes en sus procesos. Reservas, recordatorios, un portal para tus clientes, notas, pagos… Todo en un solo lugar y con tu marca y mensaje.

**Botón:** Conoce Bond →

### 6. Proyectos

**Título:** Me alegra mucho compartir sus logros… _(título igual que en la web actual)_

Testimonios en vídeo (los actuales):

**Ramsés Viloria** · Coach de relaciones de pareja · Frankfurt
Una plataforma propia para gestionar clientes, reservas y pagos, pensada para su forma de trabajar. Resultado: 4 clientes nuevos en los primeros 45 días.

**Viva México** · Banda de mariachi · NRW
Una web bilingüe (alemán y español) que sustituyó su antiguo WordPress sin perder su posicionamiento en Google.

**Botón:** Ver proyectos →

### 7. Proceso

**Título:** Entender es lo principal...

1. **Comprensión.** Antes de tocar una sola línea de código, escucho, pienso y entiendo tu negocio, tu cliente y lo que deseas transmitir.
2. **Investigación.** Estudio qué busca tu cliente, qué le preocupa y qué lo mueve a tomar sus decisiones.
3. **Implementación.** El diseño es un resultado creativo que viene del entendimiento y sigue a lo que quieres expresar. No al revés.
4. **Desarrollo.** Construcción limpia, rápida, efectiva y preparada para crecer contigo.
5. **Entrega y acompañamiento.** No desaparezco al entregar: me aseguro de que todo funcione. No te quedas solo.

### 8. La persona detrás de CAMY

**Título:** La persona detrás de CAMY

**Texto:** Me llamo Omar Ocando. Soy venezolano y vivo en Colonia, Alemania. CAMY lleva el nombre de mi hija, Camila, y nació para ayudar a profesionales como tú a mostrar lo que son de verdad.

Trabajo de forma directa, sin rodeos y contigo en cada paso. Hablamos en español o en inglés, como te resulte más cómodo.

**Botón:** Conoce mi historia →

### 9. Cierre y footer

**Título:** ¿Hablamos de tu web?

**Texto:** Cuéntame qué haces y qué quieres transmitir. Te respondo en menos de 24 horas.

**Botón:** Hablemos →

**Footer:** logo de CAMY + slogan “Tu web, reflejo de tu mensaje.” + menú (Inicio · Servicios · Bond · Proyectos · Sobre mí · Contacto) + Impressum · Datenschutz + email.

## Servicios (/servicios)

### 1. Intro

**Título:** Lo que puedo hacer por ti

**Subtítulo:** Eliges la web que necesitas. Yo me encargo de que diga lo que eres.

### 2. Webs

**Título de sección:** Tu web

**One**

Para quién: profesionales y negocios que quieren presentarse con claridad, sin complicarse.

Qué incluye: una sola página con varias secciones: quién eres, qué haces, por qué elegirte y cómo contactarte. Todo lo esencial, en un recorrido directo.

Duración: 1–2 semanas

Valor: desde 799 € · o desde 77 €/mes

**Multi**

Para quién: negocios con varios servicios, proyectos o un equipo que mostrar.

Qué incluye: varias páginas para contar tu negocio completo: inicio, servicios, proyectos, sobre ti, contacto… Cada una con su propósito.

Duración: 3–4 semanas

Valor: desde 1.199 € · o desde 115 €/mes

**Custom**

Para quién: negocios que necesitan algo más que mostrar: reservar, agendar o vender.

Qué incluye: tu web con funciones a medida: reservas, calendario, tienda online o lo que tu negocio necesite.

Duración: según el proyecto

Valor: desde 1.999 € · o desde 192 €/mes

### 3. Qué incluyen todas

**Título:** Incluido en todas tus webs:

- Diseño a medida, pensado para tu mensaje. Nada de plantillas.
- Textos claros y eficientes que explican qué haces y por qué elegirte.
- Adaptada a móvil, tablet (vertical y horizontal) y ordenador (Full Responsive).
- SEO básico para que Google te encuentre efectivamente.
- Formulario de contacto y botón de WhatsApp (si deseas).
- Páginas legales (Impressum y Datenschutzerklärung) incluidas. Tú aportas el contenido.
- Cambios ilimitados sobre el diseño aprobado.

**Extra:** ¿Tu web en más de un idioma? +15 % por idioma, con los textos traducidos aportados por ti.

### 4. Paga como prefieras

**Título:** Paga como mejor te parezca

**Texto:** Puedes pagar tu web de una vez o repartirla en cuotas mensuales. Así empiezas ya, sin esperar a tenerlo todo.

|  | Al contado | Cuotas |
| --- | --- | --- |
| One | desde 799 € | desde 77 €/mes |
| Multi | desde 1.199 € | desde 115 €/mes |
| Custom | desde 1.999 € | desde 192 €/mes |

**Nota pequeña:** Con la primera cuota reservas tu fecha de inicio.

### 5. Después del lanzamiento

**Título:** Tu web, siempre al día

**Subtítulo:** Una web no termina el día que se publica. Elige cómo quieres que siga.

**Basic · 59 €/mes** Tu web segura, actualizada y funcionando. Alojamiento, actualizaciones, copias de seguridad y pequeños cambios cada mes (textos, fotos, horarios).

**Plus · 89 €/mes** Todo lo de Basic, y además cuidamos a tus clientes: emails de bienvenida y seguimiento, peticiones de reseñas en Google y automatizaciones para que vuelvan.

**Nota pequeña:** Los pequeños cambios no incluyen cambios estructurales. Lo que vaya más allá se presupuesta aparte.

### 6. Bond

**Etiqueta:** Producto estrella

**Título:** ¿Acompañas a tus clientes en sus procesos?

**Texto:** Bond es la plataforma de gestión de CAMY para coaches, terapeutas, nutricionistas y otros profesionales que trabajan por sesiones o programas. Gestiona tu negocio y cuida a tus clientes desde un solo lugar, con tu marca y tu mensaje.

**Precio:** Montaje 999 € (o desde 96 €/mes) + 99 €/mes

**Botón:** Conoce los detalles de Bond →

### 7. Preguntas frecuentes

**¿Cuánto tarda mi web?** One, entre 1 y 2 semanas. Multi, entre 3 y 4. Custom depende del proyecto. El plazo empieza en la fecha de inicio acordada, cuando tengo todo el material.

**¿Qué necesitas de mí?** Tus textos o la información para escribirlos, fotos, logo y el acceso a tu dominio. Te envío una lista clara al empezar.

**¿El dominio es mío?** Sí. Lo compras a tu nombre y yo me encargo de conectarlo a tu web.

**¿Qué significa “cambios ilimitados sobre el diseño aprobado”?** Primero acordamos el diseño. A partir de ahí, ajustamos todo lo que necesites hasta que quede como quieres. Un cambio de concepto completo se presupuesta aparte.

**¿En qué idioma trabajamos?** En español o en inglés, como te resulte más cómodo.

**¿Cuándo es mi web completamente mía?** Cuando completas el pago. Si pagas en cuotas, el diseño y el código pasan a ser tuyos con la última cuota.

### 8. Cómo empezamos

**Título:** Así empezamos

1. **Hablamos.** Una llamada corta, por teléfono, videollamada o WhatsApp. Me cuentas tu negocio y lo que quieres transmitir.
2. **Te envío una propuesta.** Con el precio final, el plazo y una fecha de inicio reservada para ti.
3. **Empezamos.** Con el primer pago, tu fecha queda confirmada y te envío la lista de lo que necesito.

**Botón:** Hablemos de tu web →

## Bond (/bond)

### 1. Hero

**Etiqueta:** Producto estrella de CAMY

**Título:** Bond.

**Sub-título:** Gestiona tu negocio, cuida a tus clientes.

**Texto:** La plataforma para profesionales que acompañan a sus clientes en sus procesos. Reservas, agenda, seguimiento y pagos en un solo lugar, con tu marca.

**Botón principal:** Ver Bond en detalle → (lleva a la página de venta en Systeme)

**Botón secundario:** Reservar una demo

### 2. Para quién es

**Título:** Pensado para quien acompaña a sus clientes

**Texto:** Coaches, terapeutas, psicólogos, nutricionistas, profesores, fisioterapeutas, etc… Si trabajas por sesiones o programas y tus clientes recorren un camino contigo, Bond está hecho para ti.

**Línea de dolor:** Deja de saltar entre la agenda, el WhatsApp, las notas en papel y las transferencias pendientes.

### 3. Qué hace Bond

**Título:** Todo tu negocio, en un solo lugar y sencillo.

**Para ti:**

- **Reservas online** desde tu web, con tu horario, tus tipos de sesión y tus huecos libres.
- **Tu agenda del día y de la semana**, con la próxima sesión y tus notas a mano.
- **Avisos de lo que requiere tu atención:** pagos pendientes, clientes sin próxima cita, notas por completar.
- **Pagos** online o registrados a mano, siempre a la vista.

**Para tus clientes:**

- **Su propio portal**, con su próxima sesión, sus tareas y su camino recorrido.
- **Recordatorios automáticos** antes de cada sesión, en su idioma.
- **Mensajes contigo**, sin perderse entre chats.

**Detalle de confianza:** Datos protegidos y alojados en Europa, preparado para el RGPD.

### 4. Precio y cierre

**Título:** Empieza con Bond

**Precio:** Montaje 999 € (o desde 96 €/mes) + suscripción de 99 €/mes

**Texto:** Configuro Bond con tu marca, tus servicios y tus idiomas. Tú solo empiezas a usarlo.

**Botón principal:** Ver Bond en detalle →

**Botón secundario:** Reservar una demo de 30 minutos

**Nota para revisar en el proyecto de Bond:** confirmar la lista de funciones, el plazo de montaje y el texto de la parte de datos y RGPD.

## Proyectos (/proyectos)

### 1. Intro

**Título:** Proyectos reales. Resultados reales

**Subtítulo:** Cada proyecto tiene su historia y empieza igual: entender qué quiere transmitir el negocio antes de diseñar nada.

**Filtro:** Todos · One · Multi · Custom · Bond

**Nota técnica:** mostrar solo las categorías que tengan al menos un proyecto (hoy, Multi y Custom), para que ningún filtro lleve a una lista vacía. Las demás aparecen solas cuando se añadan proyectos.

_(Mantener el diseño que ya tienen las tarjetas.)_

### 2. Ramsés Viloria

**Etiqueta:** Plataforma de gestión de clientes · Custom

**Cliente:** Ramsés Viloria · Coach de relaciones de pareja · Frankfurt

**El reto:** Cinco años de experiencia, pero todos sus clientes llegaban por recomendación. Su presencia digital no reflejaba la calidad de su trabajo y no tenía un sistema para organizar clientes, citas y pagos.

**Lo que hice:** Una identidad de marca que transmite lo que él es: cercanía, confianza y compromiso. Y una plataforma propia para gestionar clientes, reservas y pagos, pensada para su forma de trabajar.

**Resultado:** 4 clientes nuevos en los primeros 45 días.

**Tecnología:** React · Node.js · MongoDB · Express · Systeme.io

**Botón:** Ver proyecto →

### 3. Viva México

**Etiqueta:** Web corporativa bilingüe · Multi

**Cliente:** Javier Reyes · Banda de mariachi profesional desde 1992 · NRW

**El reto:** Su web era un WordPress desactualizado que no transmitía la energía de su música. Necesitaba renovarla sin perder lo ganado en Google y hablar a la vez con su público alemán y con la comunidad latina.

**Lo que hice:** Una web bilingüe (alemán y español) donde la música se ve y se escucha: galería de fotos y vídeos, repertorio con muestras de audio y sus formatos (dúo, trío o mariachi completo). Con la migración cuidada para conservar su posicionamiento y el consentimiento de cookies conforme a la normativa alemana.

**Resultado:** Web nueva en marcha, sin perder posicionamiento en Google.

**Tecnología:** React · Vite · react-i18next · Google Analytics 4

**Botón:** Ver proyecto →

### 4. Testimonios y cierre

**Testimonios:** los actuales de Ramsés Viloria y Viva México (los que hoy están en la home bajo “Me alegra tanto compartir sus logros…”).

**Título de cierre:** ¿El próximo es el tuyo?

**Texto:** Cuéntame qué haces y qué quieres transmitir. En una llamada corta te digo cómo lo haría.

**Botón:** Hablemos →

## Sobre mí (/sobre-mi)

### 1. Historia

**Título:** Detrás de CAMY hay una historia ruda y hermosa.

**Subtítulo:** Te la cuento…

Nunca quise tener hijos.

Durante años preferí la libertad: viajar, crear, moverme por el mundo sin anclas. Viví en 3 continentes, migré 5 veces, sobreviví 2 secuestros y 2 bancarrotas. He aprendido más de lo que cualquier universidad podría haberme enseñado.

Entonces, a mis 49 años, algo cambió…

Por primera vez, quise ser padre... Y llegó Camila.

Llegó en las mejores condiciones para ella y en las peores para mí…

Alemania: un país extraordinario para traer y criar hijos, pero difícil para un latino sin idioma, sin red, con un acento que delata y una cultura que no siempre abre las puertas y que contrasta en formas profundas.

**NUEVO:** Ahí aprendí y experimenté el tener algo valioso que compartir y expresar, y que muy pocos lo reciban... El juicio sobre "de dónde vienes" o "cómo suenas", y no sobre lo que realmente hay... Por eso sé lo importante que es que el mensaje llegue lo más cercano posible a su origen y cómo se siente...

En medio de todo este tumulto y con la incredulidad de los más cercanos como fondo, nació CAMY.

Una decisión desesperada, atrevida y un poco desequilibrada; como casi todo lo que he hecho en la vida que ha valido la pena…

CAMY lleva el nombre de mi hija. Y cada cliente al que ayudo a mostrarse tal como es, es un paso más hacia todo lo que quiero darle.

No trabajo por un sueldo. Trabajo por ella.

**Cita destacada:** “La razón básica por la que soy tan directo, honesto y enfocado en transmitir el mensaje bien, es: No tengo tiempo que perder. Y tú tampoco.”

### 2. Cierre

**Título:** ¿Quieres trabajar con alguien que de verdad entiende lo que es empezar desde cero?

**Texto:** Hablemos. Sin compromisos. Sin formalismos.

**Botón:** Hablemos ahora →

_(Igual que el texto actual.)_

## Contacto (/contacto)

### 1. Intro y formulario

**Título:** Contáctame.

**Subtítulo:** Sin formularios interminables. Sin esperas. Solo hablemos.

**Texto (cambia):** Si tienes algo que decir y quieres que tu web lo transmita, ya tenemos de qué hablar.

Escríbeme por el medio que prefieras. Respondo en menos de 24 horas.

**Formulario — Escríbeme aquí:**

- Nombre
- Email
- Profesión o negocio
- **¿Qué te interesa? (nuevo, desplegable):** Una web One · Una web Multi · Una web Custom · La plataforma Bond · Mantenimiento (Basic o Plus) · Aún no lo sé
- Cuéntame tu proyecto

**Aviso legal bajo el formulario:** Al enviar este formulario, aceptas que tratemos tus datos para responder tu consulta, según nuestra Política de Privacidad.

**Botón:** Enviar mensaje →

### 2. WhatsApp, pasos y datos

**WhatsApp — O escríbeme directo:** Si prefieres algo más directo, escríbeme por WhatsApp. Sin filtros, sin secretarias, sin formularios.

**Botón:** Abrir WhatsApp →

**Título de pasos:** ¿Y después qué?

1. Leo tu mensaje con atención. Sin robots ni plantillas.
2. Te respondo en menos de 24 horas y, si encajamos, agendamos una llamada corta, sin costo ni compromiso.
3. En la llamada me cuentas tu negocio y lo que quieres transmitir.
4. Te envío una propuesta con el precio final, el plazo y una fecha de inicio reservada para ti.

**Datos:** Email: info@camybgs.com WhatsApp: +49 177 858 7715 Ubicación: Colonia, Alemania. Trabajo con clientes de toda Europa y Latinoamérica, en español o en inglés.
