# Planificador EPUB3 Interactivo - Simbolismo de Espacio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000)](https://ui.shadcn.com)

> Mesa de trabajo visual para planificar objetos interactivos EPUB3 en Adobe InDesign.
> Curso de Infografia - Mg. Mario Quiroz Martinez.

---

## Demo en vivo

**[https://tu-usuario.github.io/tu-repositorio/](https://tu-usuario.github.io/tu-repositorio/)**

*(Reemplaza `tu-usuario` y `tu-repositorio` con tus datos)*

---

## Que incluye

| Modulo | Descripcion |
|--------|-------------|
| **17 Componentes Interactivos** | Campo de Texto, Email, Checkbox, Radio, Dropdown, Textarea, Boton, Video, Audio, Tabs, Acordeon, Tooltip, Modal, Carrusel, Barra de Progreso, Tarjeta Hover, Scroll Reveal |
| **Efectos Avanzados** | Animaciones CSS3 con keyframes: pulse-glow, shake, shimmer, bounce-in, ripple, slide-down, confetti, 3D tilt, waveform, focus-trap |
| **Mesa de Trabajo** | Canvas con reglas en px, cuadricula, margenes guia, arrastrar-y-soltar, seleccion multiple |
| **Sistema de Capas** | Crear, renombrar, mostrar/ocultar capas con colores diferenciados |
| **Formatos de Pagina** | A4, Carta, iPad y tamano personalizado editable - orientacion Vertical/Horizontal |
| **Guia EPUB3** | 9 secciones: que es, estructura, InDesign, panel Botones, dimensiones, lectores compatibles, exportacion, EPUB3 vs PDF, componentes exclusivos |
| **Ficha de Contexto** | Nombres/apellidos, individual/equipo, contexto tematico/espacial/temporal |
| **Mapa Mental** | Interpretador de las 10 dimensiones del Simbolismo de Espacio |
| **Arco Narrativo** | 8 etapas del arco narrativo aplicadas a publicaciones digitales |
| **Generador de Prompts** | Prompts para IA optimizados para EPUB3 interactivo |
| **Validador EPUB** | Validacion estructural de archivos .epub (d3magindesign) - contenedor OCF, paquete OPF, navegacion, integridad referencial |
| **Exportar Codigo** | Genera HTML/CSS/JS de los componentes colocados en la mesa |
| **Informe PDF** | Genera informe del proyecto con contexto, componentes usados y dimensiones |

---

## Stack Tecnologico

- **React 19** + TypeScript 5.9
- **Vite 7** - Build tool ultrarapido
- **Tailwind CSS 3.4** - Framework de utilidades
- **shadcn/ui** - Componentes accesibles (40+ componentes)
- **Lucide React** - Iconos vectoriales
- **JSZip** - Validacion de archivos EPUB

---

## Instalacion local

### Requisitos
- Node.js 20+
- npm o yarn

### Pasos

```bash
# 1. Clonar o descargar el repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:3000

# 4. Compilar para produccion
npm run build
```

---

## Como publicar en GitHub Pages

### Configuracion inicial (una sola vez)

1. Crea un repositorio en GitHub
2. Sube este proyecto (o usa este como template)
3. Ve a **Settings > Pages** en tu repositorio
4. En **Source**, selecciona:
   - **Deploy from a branch**
   - Branch: `main` (o `master`)
   - Folder: `/docs`
5. Guarda y espera 1-2 minutos

### Actualizar despues de cambios

```bash
# Compilar
npm run build

# Copiar dist a docs (GitHub Pages lee de docs/)
rm -rf docs
cp -r dist docs

# Subir cambios
git add .
git commit -m "Descripcion de los cambios"
git push origin main
```

Espera 1-2 minutos y recarga tu pagina con **Ctrl + F5**.

---

## Estructura del proyecto

```
.
├── docs/                       # GitHub Pages (carpeta de publicacion)
│   ├── index.html
│   └── assets/
│       ├── index-*.js
│       └── index-*.css
├── src/
│   ├── components/             # Componentes React
│   │   ├── InteractiveMiniPreviews.tsx    # 17 mini previews con efectos
│   │   ├── WorkbenchCanvas.tsx            # Mesa de trabajo drag-and-drop
│   │   ├── ComponentPalette.tsx           # Panel de componentes
│   │   ├── InspectorPanel.tsx             # Inspector de codigo
│   │   ├── GuidePanel.tsx                 # Guia EPUB3 (9 secciones)
│   │   ├── EpubValidator.tsx              # Validador EPUB integrado
│   │   ├── LayersPanel.tsx                # Sistema de capas
│   │   ├── ProjectContextPanel.tsx        # Ficha de contexto
│   │   ├── NarrativeArc.tsx               # Arco narrativo
│   │   ├── PromptGenerator.tsx            # Generador de prompts
│   │   ├── MindMapInterpreter.tsx         # Mapa mental
│   │   ├── ExportPanel.tsx                # Exportar codigo
│   │   ├── ReportPanel.tsx                # Informe PDF
│   │   ├── DimensionPanel.tsx             # Dimensiones
│   │   └── mini-previews-effects.css      # Animaciones CSS3
│   ├── data/
│   │   ├── components.ts       # Definicion de 17 componentes
│   │   └── projectContext.ts   # Contexto del proyecto
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── index.html
├── package.json
├── vite.config.ts              # Configuracion Vite (base: './')
├── tailwind.config.js
├── tsconfig.json
└── .gitignore
```

---

## Componentes interactivos con efectos

| # | Componente | Efectos destacados |
|---|-----------|-------------------|
| 1 | Campo de Texto | Underline animado, glow pulsante |
| 2 | Email | Validacion en tiempo real, shake en error, iconos SVG |
| 3 | Checkbox | SVG stroke-draw animation, bounce elastico |
| 4 | Radio Button | Pulso expansivo, dot con scale elastico |
| 5 | Dropdown | Slide-down animation, highlight lateral |
| 6 | Textarea | Barra de progreso del limite, glow en 100% |
| 7 | Boton Enviar | Ripple effect, gradiente animado, confetti |
| 8 | Video HTML5 | Waveform realista (16 barras), glow pulsante |
| 9 | Audio Player | Visualizador de frecuencias (20 barras) |
| 10 | Tabs | Indicador deslizante, fade-up en contenido |
| 11 | Acordeon | Smooth height, rotacion icono 45 grados |
| 12 | Modal | Backdrop blur, slide-up animation, focus trap |
| 13 | Carrusel | Crossfade + scale, dots expansivos |
| 14 | Barra de Progreso | Shimmer animation, celebracion con particulas |
| 15 | Tooltip | Float-up animation, glow |
| 16 | Tarjeta Hover | Efecto 3D tilt, shimmer diagonal |
| 17 | Scroll Reveal | Stagger animation, blur-to-focus |

---

## Validador EPUB

Herramienta integrada (cortesia de **d3magindesign**) que valida:

- **Contenedor OCF**: Firma ZIP, mimetype, container.xml
- **Paquete OPF**: Version EPUB, metadatos, manifest, spine
- **Navegacion**: Documento nav (EPUB 3) o NCX (EPUB 2)
- **Integridad referencial**: Recursos del manifest, spine coherente, recursos huerfanos

> **Nota**: Es un subset estructural. No sustituye a epubcheck oficial.

---

## Dimensiones del Simbolismo de Espacio

1. Dimension Mistica
2. Dimension de la Exaltacion
3. Dimension del Idealismo
4. Dimension de la Intelectualidad
5. Dimension del Limite Emocional
6. Dimension de la Sensibilidad
7. Dimension de la Afectividad
8. Dimension de las Aspiraciones
9. Dimension de la Voluntad
10. Dimension de la Receptividad

---

## Licencia

Codigo generado para fines educativos. Uso libre para estudiantes del curso de Infografia.

---

**Desarrollado para**: Curso de Infografia  
**Docente**: Mg. Mario Quiroz Martinez  
**Institucion**: IDC - Infografia y Comunicacion
