# 🧠 Agente Contextual y Bitácora "God Mode" - Comicfest

¡Hola! Este documento es la **Arquitectura Precisa y Base de Conocimiento Definitiva** del proyecto Comicfest. Detalla con precisión *quirúrgica* las tecnologías, librerías (Reactbits, etc.), rutas exactas, módulos lógicos e implementaciones que componen esta plataforma.

> ### 🛑 OBLIGATORIO PARA EL AGENTE (GIT WORKFLOW)
> **NO ESPERES A QUE EL USUARIO LO PIDA.** CADA VEZ que el usuario indique que se va a subir código a Git (hacer "push" o "commit"), tu **PRIMER PASO AUTOMÁTICO** debe ser agregar una entrada en la **Bitácora (Sección 6)** de este archivo detallando qué se alteró. Luego haces: `git fetch`, `git pull`, `git add .`, y `git commit -m "update bitacora y [módulos]"`, finalizando con `git push origin juan-pablo`.

---

## 📦 1. Librerías y Dependencias Principales
El ecosistema visual y lógico de Comicfest se basa en las siguientes herramientas clave (`package.json`):

- **Core**: Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5. 
- **Estilos**: Tailwind CSS v4 + variables en `./app/globals.css`.
- **Animación & Renderizado Avanzado**:
  - `framer-motion` (v12+): Para micro-interacciones, orquestación de Layouts y componentes UI como `MagicBento`.
  - `three` y `ogl`: Para renderizado WebGL ultraligero/fondos generativos.
  - `gsap`: Utilizado para secuencias robustas y loaders.
  - `lenis`: Implementa el *smooth scrolling* inercial en toda la aplicación.
- **Colección "Reactbits"**: Múltiples componentes visuales *premium* fueron importados e integrados manualmente como bloques en la carpeta `components/ui/`.

---

## 🧩 2. Mapa de Componentes UI y Reactbits (Implementación)
Aquí se detalla qué hace cada componente interactivo, cómo se llama y dónde está su código:

- **Pantalla de Carga (PageLoader)**
  - *Ruta*: `components/ui/PageLoader.tsx`
  - *Detalles*: Utiliza el asset global `/public/pantalla-de-carga.png`. Ejecuta una cortina de transición que se disuelve usando montajes de `framer-motion`/`gsap` al entrar en la página.
- **Navbar**
  - *Ruta*: `components/ui/Navbar.tsx` y `components/ui/StaggeredMenu.tsx`
  - *Detalles*: Barra de navegación principal que usa `/public/navbar.png`. Implementa el menú colgante tipo `StaggerMenu` animado. Ojo: El CTA principal (botón "Ingreso/Registro") rutea explícitamente a `/login`.
- **Grid Scan Background**
  - *Ruta*: `components/ui/GridScan.tsx` + `GridScan.css` (De Reactbits)
  - *Detalles*: Genera una cuadrícula tridimensional infinita con un láser que "escanea" desde el horizonte. Se usa como `<GridScan>` en la capa de fondo de los héroes (Hero) utilizando baja opacidad.
- **Bento Landing (y Grid Layouts)**
  - *Ruta*: `components/sections/BentoLanding.tsx` | `components/ui/MagicBento.tsx` | `TiltedCard.tsx`
  - *Detalles*: La estructura modular de la landing interactiva. Usa "Magic Bento" de Reactbits y arreglos tipo `TiltedCard` para mostrar cards tridimensionales al pasar el cursor.
- **Otros Fondos y Efectos (Reactbits & Customs)**
  - `LightRays.tsx` (Rayos de luz dinámicos en el FAQ de BentoLanding).
  - `ElectricBorder.tsx` y `PixelBlast.tsx`.
  - `ScrollFloat.tsx` (Para animar títulos que flotan a medida que scrolleas).

---

## 🗺️ 3. Enrutamiento y Jerarquía de Páginas (Next.js App Router)
Todos los flujos de usuario operan dentro del directorio `/app/` bajo un paradigma de enrutamiento por carpetas:

- **Inicio / Landing Page** -> `/app/page.tsx`
  - Ensamble maestro que consume el `Hero`, `BentoLanding`, `ActivitiesPreview` y `ExhibitorsPreview`, montados sobre `ClientLayout.tsx`.
- **Actividades, Torneos y Copas** -> `/app/actividades/[slug]/page.tsx`
  - Sistema de URLs dinámicas (p.ej., `/actividades/copa-cosplay`, `/actividades/torneo-esports`, `/actividades/campeonato`).
  - *Estilo Creado*: Usa Hero estandarizado (`580px` alto mínimo), tipografía grande en cursiva (Italic Display) y descripciones en estructura Grid (`grid-cols-2`). 
- **Prensa** -> `/app/prensa/page.tsx`
  - Formulario y registro para medios. Usa los estilos de layout estándar de "Registro".
- **Expositores (Reservas y Manuales)** -> `/app/expositores/page.tsx`
  - Ruta de prospección comercial. Contiene botones y CTAs (como la descarga o visualización de manuales/dossiers de stands).
- **Trabaja con Nosotros (Staff/Logística)** -> `/app/trabaja-con-nosotros/page.tsx`
  - Flujo de postulación estandarizado bajo el mismo `page.tsx` layout.
- **Términos y Condiciones (TyC)** -> `/app/terminos/page.tsx` (y sus slugs respectivos si ameritan divisiones).
  - Textos legales y normativas. 
- **Flujos de Auth (Login y Registro Exitoto)**
  - `/app/login/page.tsx`: Pantalla de autenticación y login principal para usuarios / marcas / competidores.
  - `/app/registro/page.tsx` y Modales de Registro Exitoso: Son estados y formularios a transicionar una vez el visitante decida darse de alta (ya sea desde el navbar o el final de un formulario de actividad).

---

## 🎨 4. Estilos, Backgrounds y Animaciones (Diseño Premium)

- **Fondos Duros (Backgrounds)**: Ninguna sección principal va en blanco sólido; se utiliza fondo oscuro (`bg-black` o un hex muy oscuro) mezclado con fondos generativos (como `<Galaxy>` o `<Particles>`) que corren en `<canvas>`.
- **Espaciados**: Se controlan rígidamente por utilidades en `app/globals.css`.
  - `.hero-description-spacing`, `.card-action-spacing`,`.activity-button-spacing` (Para alinear botones de forma uniforme, usando la base `max-w-4xl`, `items-center` y `justify-center`).
- **Animaciones Funcionales**: 
  - Todo elemento que se revela al hacer Scroll lo hace gatillado a través del paquete `framer-motion` usando `whileInView`.
  - Las listas de preguntas frecuentes (FAQ) en BentoLanding utilizan animaciones unidas al progreso inercial del Scroll (Scroll-driven).

---

## 🛠️ 5. Flujo Técnico y Solución de Problemas (Skills del Agente)

1. **Evitar Sobrescrituras Visuales (Z-Index)**: Al arreglar `GridScan` o `LightRays`, SIEMPRE envolver el contenido principal en contenedores `relative z-10` y los Canvas/Tres.js al fondo (`absolute inset-0 z-0 opacity-X`), de lo contrario los clics se bloquean.
2. **Texturas y Assets**: Asegurarse de referenciar bien `/public/...` (Ej: `/navbar.png`). No crear componentes desde cero si ya existe una variante Reactbits (`Cards`, `Bentos`, `Scans`) en la carpeta `components/ui/`.
3. **Formularios de Registro**: El renderizado estandarizado es vital para no romper el aspecto "Airy" de los layouts en las páginas de Exhibitor/Media/Staff.

---

## 📓 6. Bitácora de Modificaciones (Actualización Autónoma Obligatoria)

> *Agente, documenta la fecha, autor y los cambios clave por subida:*

- **[23 de Abril, 2026]** *(Juan / Agente)*: 
  - Archivo `agent.md` convertido a *God Mode* (especificaciones absolutas de Reactbits, rutas dinámicas y dictamen técnico).
  - Se eliminó el botón amarillo "Volver al inicio" de todas las vistas secundarias (`/trabaja-con-nosotros`, `/prensa`, `/registro`, `/login`, `/expositores`, `EsportsPage` y `ActivityDetailPage`) usando un block-spacer sin desencajar layouts.
  - Se estandarizó el aspecto "Premium" de todos los botones CTA (uppercase, bordes).
  - Se unificó el espaciamiento top/bottom y el "gap" horizontal asimétrico de botones dobles mediante `.activity-button-spacing` (gap de 3.5rem / 56px lateral en Flex) en `globals.css` eliminando el margen muerto de `.activity-header-spacing`.
  - Se implementó un **Ancho Global Fijo (`max-width: 280px`, `width: 100%`)** unificado en `globals.css` para que todos los botones (`a` y `button`) luzcan geométricamente idénticos sin importar la longitud de su texto.
  - Todos los formularios locales ahora tienen su `h3` y `p` centrados (`flex flex-col items-center text-center`) al igual que Login/Registro.
  - **Enrutamiento Expositor:** Se purgó y **eliminó `RegistroModal.tsx`** de la vista `/expositores`, enrutando el CTA de Registro directamente hacia la página base centralizada `/registro` para consistencia estructural.
  - **Identidad de Interfaz (Forms):** Reposición de estilos por defecto del navegador en elementos `<select>`. En `/prensa` las opciones (*Medio*, *Creador*) adoptaron el esquema Dark Theme (`backgroundColor: #1a1a1a`) junto con un ícono `ChevronDown` estandarizado, emulando la misma elegancia de `/trabaja-con-nosotros`. 
  - **Depuración de Data:** Actualización y purga de la constante en duro `EPS_LIST` en el registro logístico. Se eliminaron EPS difuntas (Cruz Blanca, Medimás) y se ordenó un abanico preciso y activo correspondientes al sistema de salud colombiano actual.
  - **Cartelera Gráfica de Ciudades:** En `/expositores`, se reemplazó la vieja caja monobloque final por una visualización a full anchura en apilamiento vertical (*Flex*) presentando a **Cali** y **Armenia** como *Próximas Ciudades*. Se integraron de manera local sus fondos inmersivos aplicando overlays oscuros estáticos en CSS.
    - **Replicación Fiel y Tipografía:** Se estandarizó la información exacta de las fechas presentadas en producción, usando cápsulas translúcidas para ubicación y fechas.
    - **Vectores sobre Emojis:** Se integraron de manera nativa los iconos vectoriales de la librería `lucide-react` (`Clock`, `MapPin`, `Calendar`) para dar una estética limpia y profesional, dejando de lado los viejos emojis tipográficos.
    - **Profundidad Acuática:** Se añadió un watermark masivo sutil en opacidad del 30% como fondo de la información central de la tarjeta, empoderando el branding.
- **[25 de Abril, 2026]** *(Juan / Agente)*:
  - **Refinamiento UI Esports:** Se actualizó la información de premios en las tarjetas de torneos a un formato unificado ("Premio: 200.000 COP"). Se simplificó la nota informativa inferior convirtiéndola en texto plano para mayor limpieza visual. Se separaron las dos filas de juegos introduciendo un margen vertical (`mb-16`) para mejor respiración.
  - **Corrección Bug Responsivo (Scroll-Trap):** Se detectó y resolvió un fallo grave en navegadores móviles (Chrome/Safari) donde el desbordamiento horizontal de los canvas de `ElectricBorder` obligaba al viewport a hacer un *zoom-out*, rompiendo las proporciones del `PageLoader` e invalidando los eventos de scroll de `window` que disparaban el efecto "recogible" del Navbar.
    - Se aplicó `overflow-x: clip; width: 100%;` en el `body` (`globals.css`) para evitar que el scroll escape sin crear un nuevo contexto de formateo que rompa el evento `window.scrollY`.
    - Se eliminó el `overflow-x-clip` forzado sobre la cuadrícula de torneos para no decapitar y preservar fielmente el difuminado original del resplandor lateral en monitores de escritorio.
  - **Botones Sociales Móviles Flotantes:** Se enriqueció el componente `ScrollToTop.tsx` agregando hipervínculos dinámicos (Facebook, Instagram, WhatsApp) anclados encima de la flecha de "Volver Arriba". Esta integración es exclusivamente visible para dispositivos móviles (`md:hidden`) replicando la estética glassmorphism premium con bordes difuminados y opacidad, importando los datos de red oficiales desde `EVENT.socialMedia`.
- **[Abril 2026]** *(Sprint Previo)*:
  - Consolidación del Hero universal para formas de registro `/prensa`, `/expositores`, `/trabaja-con-nosotros`. 
  - Reemplazo y unificación del enlace global de Navbar apuntando al módulo `/login`.
  - Animación e integración del `PageLoader` utilizando GSAP/Framer y el asset `pantalla-de-carga.png`.
