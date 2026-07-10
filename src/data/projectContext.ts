export interface ProjectContext {
  // Datos del estudiante
  nombres: string;
  apellidos: string;
  email: string;
  codigo: string;
  seccion: string;

  // Tipo de trabajo
  esTrabajoIndividual: boolean;
  esTrabajoEnEquipo: boolean;
  numeroIntegrantes: number;
  nombresIntegrantes: string;

  // Contexto tematico - Simbolismo de Espacio
  contextoTematico: string;
  contextoEspacial: string;
  contextoTemporal: string;

  // Dimensiones del simbolismo de espacio seleccionadas
  dimensionesSeleccionadas: string[];

  // Info del proyecto
  tituloProyecto: string;
  descripcionProyecto: string;
  publicoObjetivo: string;
}

export const defaultProjectContext: ProjectContext = {
  nombres: '',
  apellidos: '',
  email: '',
  codigo: '',
  seccion: '',
  esTrabajoIndividual: true,
  esTrabajoEnEquipo: false,
  numeroIntegrantes: 1,
  nombresIntegrantes: '',
  contextoTematico: '',
  contextoEspacial: '',
  contextoTemporal: '',
  dimensionesSeleccionadas: [],
  tituloProyecto: '',
  descripcionProyecto: '',
  publicoObjetivo: '',
};

// Dimensiones del Simbolismo de Espacio del PDF
export interface SpaceDimension {
  id: string;
  name: string;
  level: string; // consciente, inconsciente, etc.
  description: string;
  emotionalConnection: string;
  visualResources: string[];
  color: string;
}

export const spaceDimensions: SpaceDimension[] = [
  {
    id: 'mistico',
    name: 'Mistico (Fantasia)',
    level: 'Consciente',
    description: 'Espacio de lo sobrenatural, lo magico y lo fantastico. Representa la dimension imaginaria y onirica del ser.',
    emotionalConnection: 'Asombro, maravilla, curiosidad, miedo a lo desconocido',
    visualResources: ['Nubes', 'Estrellas', 'Nebulosas', 'Portales', 'Cristales', 'Espejos magicos'],
    color: '#8B5CF6',
  },
  {
    id: 'exaltacion',
    name: 'Exaltacion',
    level: 'Consciente',
    description: 'Espacio de la euforia y la elevacion emocional. Dimension del extasis creativo y la inspiracion maxima.',
    emotionalConnection: 'Euforia, inspiracion, elevacion, trascendencia',
    visualResources: ['Rayos de luz', 'Coronas', 'Fuegos artificiales', 'Vuelos', 'Cumbres'],
    color: '#F59E0B',
  },
  {
    id: 'idealismo',
    name: 'Idealismo',
    level: 'Consciente',
    description: 'Espacio de la perfeccion conceptual y la utopia. Representa lo que podria ser, la vision ideal del mundo.',
    emotionalConnection: 'Anhelo, esperanza, perfeccionismo, sueno',
    visualResources: ['Horizontes', 'Arcoiris', 'Ciudades celestiales', 'Jardines perfectos', 'Geometria sagrada'],
    color: '#3B82F6',
  },
  {
    id: 'intelectualidad',
    name: 'Intelectualidad (Inteligencia)',
    level: 'Consciente',
    description: 'Espacio del conocimiento, la logica y el razonamiento. Dimension del pensamiento estructurado.',
    emotionalConnection: 'Certeza, comprension, claridad, orden',
    visualResources: ['Laberintos', 'Redes neuronales', 'Bibliotecas infinitas', 'Relojes', 'Graficos'],
    color: '#10B981',
  },
  {
    id: 'limite-emocional',
    name: 'Limite de lo emocional con lo espiritual',
    level: 'Umbral',
    description: 'La frontera entre el sentimiento humano y la trascendencia espiritual. Punto de transformacion.',
    emotionalConnection: 'Nostalgia, conexion profunda, serenidad, pertenencia',
    visualResources: ['Horizonte mar', 'Atardeceres', 'Puertas', 'Puentes', 'Agua cristalina'],
    color: '#EC4899',
  },
  {
    id: 'sensibilidad',
    name: 'Sensibilidad emocional',
    level: 'Normal',
    description: 'Espacio de la percepcion sutil, la empatia y la receptividad emocional. Conexion con el entorno.',
    emotionalConnection: 'Ternura, empatia, vulnerabilidad, calma',
    visualResources: ['Flores', 'Gotas de agua', 'Plumas', 'Velas', 'Musica visual'],
    color: '#F97316',
  },
  {
    id: 'afectividad',
    name: 'Afectividad',
    level: 'Normal',
    description: 'Espacio del afecto, el carino y los vinculos interpersonales. Dimension del amor y la amistad.',
    emotionalConnection: 'Carino, proteccion, calidez, union',
    visualResources: ['Abrazos', 'Manos entrelazadas', 'Corazones', 'Hogares', 'Arboles frondosos'],
    color: '#EF4444',
  },
  {
    id: 'aspiraciones',
    name: 'Aspiraciones del alma',
    level: 'Normal',
    description: 'Espacio de los deseos profundos, los suenos y las metas trascendentales del ser humano.',
    emotionalConnection: 'Determinacion, anhelo, proposito, vision',
    visualResources: ['Escaleras al cielo', 'Globos', 'Cometas', 'Faro', 'Aves en vuelo'],
    color: '#06B6D4',
  },
  {
    id: 'voluntad',
    name: 'Voluntad',
    level: 'Normal',
    description: 'Espacio de la decision, el esfuerzo y la accion consciente. Dimension del poder personal.',
    emotionalConnection: 'Fortaleza, decision, coraje, responsabilidad',
    visualResources: ['Montanas', 'Fortalezas', 'Espadas', 'Fuegos', 'Caminos empedrados'],
    color: '#DC2626',
  },
  {
    id: 'receptividad',
    name: 'Receptividad sensorial',
    level: 'Normal',
    description: 'Espacio de la percepcion sensorial, la apertura a experiencias y la absorcion de estimulos.',
    emotionalConnection: 'Curiosidad, asombro, apertura, frescura',
    visualResources: ['Ojos', 'Espirales', 'Mandalas', 'Texturas', 'Colores vibrantes'],
    color: '#84CC16',
  },
];

// Arco narrativo basado en simbolismo de espacio
export interface NarrativeStage {
  id: string;
  name: string;
  dimension: string;
  description: string;
  interactiveElements: string[];
  visualApproach: string;
}

export const narrativeArc: NarrativeStage[] = [
  {
    id: 'intro',
    name: 'Introduccion: Receptividad',
    dimension: 'receptividad',
    description: 'El lector ingresa al espacio. Se presenta el tema con elementos interactivos de bienvenida.',
    interactiveElements: ['Boton de inicio', 'Animacion de entrada', 'Indicador de progreso'],
    visualApproach: 'Colores vibrantes, texturas sensoriales, apertura visual amplia',
  },
  {
    id: 'descubrimiento',
    name: 'Descubrimiento: Sensibilidad',
    dimension: 'sensibilidad',
    description: 'El lector explora las emociones del espacio. Elementos delicados y empaticos.',
    interactiveElements: ['Acordeon de contenido', 'Tooltips informativos', 'Galeria de imagenes'],
    visualApproach: 'Formas suaves, flores, agua, elementos delicados y sutiles',
  },
  {
    id: 'conexion',
    name: 'Conexion: Afectividad',
    dimension: 'afectividad',
    description: 'El lector se conecta emocionalmente con el contenido. Vinculos y relaciones.',
    interactiveElements: ['Formulario de retroalimentacion', 'Encuesta interactiva', 'Cards con hover'],
    visualApproach: 'Calidez, manos, abrazos visuales, colores calidos',
  },
  {
    id: 'reflexion',
    name: 'Reflexion: Intelectualidad',
    dimension: 'intelectualidad',
    description: 'El lector analiza y comprende. Datos, estructuras y organizacion logica.',
    interactiveElements: ['Tabs de informacion', 'Graficos de datos', 'Mapas conceptuales'],
    visualApproach: 'Geometria, redes, laberintos, estructuras ordenadas',
  },
  {
    id: 'eleccion',
    name: 'Eleccion: Voluntad',
    dimension: 'voluntad',
    description: 'El lector toma decisiones. Caminos a elegir y acciones a ejecutar.',
    interactiveElements: ['Radio buttons', 'Lista desplegable', 'Botones de accion'],
    visualApproach: 'Caminos divergentes, montanas, fortalezas, elementos solidos',
  },
  {
    id: 'aspiracion',
    name: 'Aspiracion: Idealismo',
    dimension: 'idealismo',
    description: 'El lector visualiza lo posible. Utopias y visiones de futuro.',
    interactiveElements: ['Canvas animado', 'Scroll reveal', 'Video de inspiracion'],
    visualApproach: 'Horizontes, arcoiris, geometria sagrada, vistas panoramicas',
  },
  {
    id: 'transformacion',
    name: 'Transformacion: Limite emocional-espiritual',
    dimension: 'limite-emocional',
    description: 'El punto de inflexion. El lector trasciende hacia la comprension profunda.',
    interactiveElements: ['Modal de revelacion', 'Audio inmersivo', 'Transicion animada'],
    visualApproach: 'Atardeceres, puertas, puentes, agua, horizontes infinitos',
  },
  {
    id: 'trascendencia',
    name: 'Trascendencia: Exaltacion + Mistico',
    dimension: 'exaltacion',
    description: 'El climax de la experiencia. Euforia, extasis y conexion con lo sublime.',
    interactiveElements: ['Fireworks canvas', 'Celebracion animada', 'Mensaje final interactivo'],
    visualApproach: 'Luces, estrellas, vuelo, coronas, fuegos artificiales visuales',
  },
];
