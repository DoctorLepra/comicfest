# Comicfest Colombia — Guía de Configuración

Mockup del sitio web para Comicfest Colombia, desarrollado con Next.js 16 + Tailwind CSS v4.

---

## ⚙️ Requisitos del sistema

| Herramienta | Versión mínima             | Notas                         |
| ----------- | -------------------------- | ----------------------------- |
| **Node.js** | `>= 18.18.0`               | Se recomienda LTS (v20 o v22) |
| **npm**     | `>= 9.0`                   | Incluido con Node.js          |
| **Git**     | cualquier versión reciente | Para clonar y colaborar       |

> [!IMPORTANT]
> Verifica tu versión de Node antes de empezar: `node -v`
> Si estás por debajo de v18, descarga la última LTS en [nodejs.org](https://nodejs.org)

---

## 🚀 Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/DoctorLepra/comicfest.git

# 2. Entrar a la carpeta del proyecto
cd comicfest

# 3. Instalar dependencias
npm install

# 4. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📦 Dependencias del proyecto

### Producción

| Paquete         | Versión    | Uso                                                |
| --------------- | ---------- | -------------------------------------------------- |
| `next`          | `16.1.6`   | Framework principal (App Router)                   |
| `react`         | `19.2.3`   | UI                                                 |
| `react-dom`     | `19.2.3`   | Renderizado DOM                                    |
| `three`         | `^0.183.1` | WebGL para animación LaserFlow (pantalla de carga) |
| `framer-motion` | `^12.34.3` | Animaciones y transiciones                         |
| `lucide-react`  | `^0.575.0` | Iconos                                             |
| `clsx`          | `^2.1.1`   | Clases CSS condicionales                           |

### Desarrollo

| Paquete                | Versión    | Uso                                |
| ---------------------- | ---------- | ---------------------------------- |
| `typescript`           | `^5`       | Tipado estático                    |
| `tailwindcss`          | `^4`       | Estilos utilitarios                |
| `@tailwindcss/postcss` | `^4`       | Integración PostCSS de Tailwind v4 |
| `eslint`               | `^9`       | Linter                             |
| `eslint-config-next`   | `16.1.6`   | Reglas ESLint para Next.js         |
| `@types/node`          | `^20`      | Tipos para Node.js                 |
| `@types/react`         | `^19`      | Tipos para React                   |
| `@types/react-dom`     | `^19`      | Tipos para React DOM               |
| `@types/three`         | `^0.183.1` | Tipos para Three.js                |

> [!NOTE]
> **No es necesario instalar nada manualmente.** Todo está declarado en `package.json`.
> Un solo `npm install` descarga todas las dependencias.

---

## 📜 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo en localhost:3000
npm run build    # Build de producción optimizado
npm run start    # Sirve el build de producción
npm run lint     # Revisar errores de código
```

---

## 🗂️ Estructura del proyecto

```
comicfest/
├── app/                        # App Router de Next.js
│   ├── layout.tsx              # Layout raíz (fuentes, Navbar, Footer)
│   ├── page.tsx                # Página Home
│   ├── globals.css             # Variables CSS, paleta, animaciones
│   ├── actividades/            # Página de actividades
│   ├── agenda/                 # Agenda / cronograma por día
│   ├── entradas/               # Compra de entradas
│   ├── expositores/            # Info pública para expositores
│   │   └── reserva/            # Sistema de reserva de stands
│   ├── prensa/
│   └── trabaja-con-nosotros/
├── components/
│   ├── sections/               # Hero, Stats, ActivitiesPreview, FAQ…
│   └── ui/                     # Navbar, Footer, LaserFlow, PageLoader…
├── lib/
│   └── constants.ts            # Datos del evento (fechas, precios, actividades)
├── public/
├── package.json
└── tsconfig.json
```

---

## 🌐 Exponer el localhost a otra red

```bash
# Cloudflare Tunnel — sin cuenta, sin contraseña
winget install Cloudflare.cloudflared   # solo la primera vez
cloudflared tunnel --url http://localhost:3000
# → Genera una URL pública https://xxxx.trycloudflare.com
```

---

## 🤝 Flujo de trabajo colaborativo

```bash
# Antes de empezar siempre actualizar
git pull origin master

# Después de hacer cambios
git add -A
git commit -m "feat: descripción del cambio"
git push origin master
```

> [!TIP]
> Se recomienda trabajar con ramas por feature:
>
> ```bash
> git checkout -b feature/nombre-del-feature
> git push origin feature/nombre-del-feature
> # Luego abrir un Pull Request en GitHub
> ```
