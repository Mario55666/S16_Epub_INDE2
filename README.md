# Planificador EPUB3 Interactivo — Simbolismo de Espacio

> **Herramienta de planificacion visual** para organizar objetos interactivos en publicaciones EPUB3, basada en el contexto teorico del **Simbolismo de Espacio**.

---

## Contexto Academico

- **Institucion:** IDC — Instituto de Diseno y Comunicacion
- **Curso:** Infografia
- **Docente:** Mg. Mario Quiroz Martinez
- **Proyecto:** Infografia interactiva EPUB3 sobre el Simbolismo de Espacio

---

## Descripcion

Esta aplicacion web permite a los estudiantes **planificar, organizar y esquematizar** elementos interactivos (formularios, multimedia, animaciones, componentes UI) sobre una mesa de trabajo virtual con cuadricula en pixeles. La herramienta integra las 10 dimensiones del Simbolismo de Espacio como marco teorico para la toma de decisiones de diseno interactivo.

El objetivo es que el estudiante pueda, antes de abrir Adobe InDesign, tener una vision clara de:
- Que elementos interactivos usara
- Donde los posicionara en la pagina (en pixeles)
- Como se insertan en InDesign paso a paso
- Las formulas HTML, CSS y JavaScript que necesitara
- El arco narrativo que seguira el lector

---

## Caracteristicas Principales

### 1. Mesa de Trabajo con Cuadricula
- Cuadricula de 50px con reglas de pixeles en bordes
- Formatos de pagina: A4 (595x842 px), Carta (612x792 px), iPad (768x1024 px), Custom
- Orientacion vertical y horizontal
- Margenes de seguridad visualizados (8% estandar)
- Area util calculada automaticamente

### 2. Ficha de Contexto del Proyecto
- Datos del estudiante (nombres, apellidos, email, codigo, seccion)
- Tipo de trabajo: Individual o Equipo (con lista de integrantes)
- Contexto Tematico, Espacial y Temporal
- Titulo, descripcion y publico objetivo del proyecto

### 3. Simbolismo de Espacio Integrado
Las 10 dimensiones teoricas disponibles para seleccionar:
- **Consciente:** Mistico, Exaltacion, Idealismo, Intelectualidad
- **Umbral:** Limite emocional-espiritual
- **Normal:** Sensibilidad emocional, Afectividad, Aspiraciones del alma, Voluntad, Receptividad sensorial

Cada dimension incluye: descripcion, conexion emocional, recursos visuales y color asociado.

### 4. Sistema de Capas (Layers)
- Crear multiples capas con nombre y color propio
- Mostrar/ocultar capas individualmente
- Reordenar capas
- Los objetos se colocan en la capa activa

### 5. Interpretacion de Mapa Mental
- Pegar un mapa mental en formato Markdown
- La herramienta analiza el contenido y sugiere elementos interactivos
- Boton para colocar automaticamente los elementos sugeridos en la mesa

### 6. Generador de Prompt
- Seleccionar dimensiones del simbolismo de espacio
- Seleccionar etapas del arco narrativo
- Genera un mapa mental en Markdown descargable

### 7. Arco Narrativo
8 etapas basadas en el simbolismo de espacio:
1. Receptividad → 2. Sensibilidad → 3. Afectividad → 4. Intelectualidad → 5. Voluntad → 6. Idealismo → 7. Transformacion → 8. Trascendencia

Cada etapa incluye: descripcion, enfoque visual y elementos interactivos recomendados.

### 8. Inspector de Componentes
Al hacer clic en un objeto colocado, muestra:
- **Guia InDesign:** Paso a paso de como insertar el elemento en Adobe InDesign
- **Formula HTML:** Codigo listo para copiar
- **Formula CSS:** Estilos necesarios
- **Formula JavaScript:** Logica de interactividad

### 9. Informe Completo
Boton "Informe" que genera un documento HTML imprimible (Ctrl+P → PDF) con:
- Portada del proyecto
- Datos del estudiante y tipo de trabajo
- Contexto tematico, espacial y temporal
- Dimensiones del simbolismo de espacio seleccionadas
- Arco narrativo
- Elementos interactivos planificados con posiciones en pixeles y capas
- Checklist de implementacion EPUB3
- Formulas HTML de todos los componentes

### 10. 15 Componentes Interactivos

**Formularios:** Campo de Texto, Email, Checkbox, Radio Button, Lista desplegable, Area de Texto, Boton Enviar
**Multimedia:** Video HTML5, Audio Player
**Navegacion:** Tabs/Pestanas, Acordeon
**Contenido UI:** Tooltip/Info, Modal/Popup, Carrusel
**Animacion:** Barra de Progreso, Card con Hover, Scroll Reveal

---

## Estructura del Proyecto

```
planificador-epub3/
  src/
    App.tsx                          # Componente principal
    main.tsx                         # Punto de entrada
    index.css                        # Estilos globales
    components/
      ComponentPalette.tsx           # Panel de componentes arrastrables
      WorkbenchCanvas.tsx            # Mesa de trabajo central
      InspectorPanel.tsx             # Inspector con guias y codigo
      ExportPanel.tsx                # Exportar codigo XHTML/CSS/JS
      GuidePanel.tsx                 # Guia completa de EPUB3 en InDesign
      DimensionPanel.tsx             # Dimensiones y conversion de unidades
      ProjectContextPanel.tsx        # Ficha de contexto del estudiante
      LayersPanel.tsx                # Sistema de capas
      MindMapInterpreter.tsx         # Interpretar mapa mental Markdown
      PromptGenerator.tsx            # Generador de prompt en Markdown
      NarrativeArc.tsx               # Visualizacion del arco narrativo
      ReportPanel.tsx                # Generador de informe imprimible
    data/
      components.ts                  # Definicion de 15 componentes interactivos
      projectContext.ts              # Contexto del proyecto, dimensiones, arco narrativo
  dist/                              # Archivos compilados listos para desplegar
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
  tsconfig.json
```

---

## Tecnologias Utilizadas

- **React 19** + **TypeScript** — Framework y tipado
- **Vite 7** — Build tool
- **Tailwind CSS 3** — Estilos utilitarios
- **shadcn/ui** — Componentes de UI (tabs, checkbox, textarea, etc.)
- **Lucide React** — Iconos

---

## Flujo de Trabajo del Estudiante

1. **Rellenar la Ficha de Contexto** con datos personales y del proyecto
2. **Seleccionar las dimensiones** del Simbolismo de Espacio que usara
3. **Definir el formato** de la pagina (A4, Carta, iPad) y orientacion
4. **Pegar su mapa mental** en Markdown para obtener sugerencias de elementos
5. **Arrastrar componentes** a la mesa de trabajo y organizarlos
6. **Usar capas** para separar elementos por secciones o etapas
7. **Revisar el arco narrativo** para verificar el recorrido del lector
8. **Hacer clic en cada elemento** para ver la guia de InDesign y las formulas
9. **Generar el informe** para entregar la planificacion
10. **Exportar el codigo** para insertarlo en el EPUB tras exportar desde InDesign

---

## Referencias Teoricas

- **Simbolismo de Espacio:** Dimensiones del espacio humano segun teoria de la percepcion espacial y simbolismo
- **EPUB 3.0:** Especificacion W3C para publicaciones digitales — https://www.w3.org/publishing/epub3.html
- **Adobe InDesign:** Panel Botones y Formularios para contenido interactivo
- **Thorium Reader:** Lector EPUB3 de referencia con soporte completo de JavaScript y CSS

---

## Autor

Proyecto desarrollado como parte del curso de **Infografia** del **IDC — Instituto de Diseno y Comunicacion**, bajo la direccion del **Mg. Mario Quiroz Martinez**.
