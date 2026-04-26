# Comicfest: Technical Contextualization & Developer Guide

This document serves as the technical single source of truth for the **Comicfest** web application. It is designed to help new or returning developers understand the architecture, routing, and design standards of the project.

---

## 🛠 Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Custom Global Utilities (`app/globals.css`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Core Components**: Custom interactive elements (WebGL/Canvas-based backgrounds).

---

## 📍 Routing Map (Main Routes)

All routes are defined within the `app/` directory and use the Next.js App Router pattern.

| Route | Purpose | Key Component / Layout |
| :--- | :--- | :--- |
| `/` | Landing Page | `page.tsx` + Section Components |
| `/actividades/[slug]` | Activity Detail (Copa Cosplay, K-pop, etc.) | `ActivityDetailPage.tsx` (2-column Grid) |
| `/expositores` | Brand/Exhibitor Registration | `ExpositoresPage.tsx` |
| `/prensa` | Media/Content Creator Registration | `app/prensa/page.tsx` |
| `/trabaja-con-nosotros` | Staff/Logistics Registration | `app/trabaja-con-nosotros/page.tsx` |
| `/terminos/[slug]` | Terms & Conditions | Referenced for layout standards |
| `/agenda` | Event Schedule | `app/agenda` |
| `/entradas` | Ticket Purchase Information | `app/entradas` |

---

## 🏗 Design Standards (Standardized Layouts)

We have implemented a **Standardized Hero Pattern** for all registration and activity pages. Any new detail page should follow these rules:

1.  **Hero Height**: 580px (Standard).
2.  **Typography**: Use high-impact italic font for titles:
    - Classes: `font-display text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl`
3.  **Spacing Utilities**: Use these global classes defined in `globals.css`:
    - `.hero-description-spacing`: (3rem margin-top for descriptions).
    - `.activity-header-spacing`: (6rem margin-bottom to separate desc from buttons).
    - `.activity-button-spacing`: Standardized gap for action buttons.
4.  **Information Layout**: Use a 2-column grid (`grid md:grid-cols-2 gap-12`) for description and feature lists to maintain horizontal balance.

---

## 🌿 Branch & Git Workflow

### Active Branch
The current development work happens on the **`juan-pablo`** branch.

#### Safe Push Workflow
To ensure a clean history without merge conflicts:
1.  **Stage & Commit**: `git add .` and `git commit -m "Descriptive message"`.
2.  **Verify Remote Status**: `git fetch origin juan-pablo`.
3.  **Integrated Update**: `git pull origin juan-pablo`.
4.  **Confirm Alignment**: Resolve any conflicts locally.
5.  **Final Push**: `git push origin juan-pablo`.

---

## 🚀 Installation & Local Development

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/DoctorLepra/comicfest.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at http://localhost:3000.

---

## 📝 Recent Project History
- **Layout Unification**: Standardized the visual language of registration forms to match the premium aesthetic of the main event activities.
- **Header Refinement**: Expanded header heights to accommodate "airy" spacing while keeping action buttons visible.
- **UI Decoupling**: Removed background cards from info sections in Activity Detail pages to favor a cleaner, text-on-background look (refer to Copa Cosplay).
