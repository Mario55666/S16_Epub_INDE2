import { useState } from 'react';
import { type ProjectContext, spaceDimensions } from '@/data/projectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Users, BookOpen, MapPin, Clock, Sparkles, Save, Edit3 } from 'lucide-react';

interface ProjectContextPanelProps {
  context: ProjectContext;
  onChange: (ctx: ProjectContext) => void;
}

export function ProjectContextPanel({ context, onChange }: ProjectContextPanelProps) {
  const [isEditing, setIsEditing] = useState(true);

  const update = (field: keyof ProjectContext, value: any) => {
    onChange({ ...context, [field]: value });
  };

  const toggleDimension = (dimId: string) => {
    const current = context.dimensionesSeleccionadas;
    const next = current.includes(dimId)
      ? current.filter(d => d !== dimId)
      : [...current, dimId];
    update('dimensionesSeleccionadas', next);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Ficha de Contexto</h2>
              <p className="text-[10px] text-muted-foreground">Datos del proyecto y estudiante</p>
            </div>
          </div>
          <Button
            size="sm"
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs gap-1"
          >
            {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
            {isEditing ? 'Guardar' : 'Editar'}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Datos del estudiante */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <User className="w-3 h-3" />
            Datos del Estudiante
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <Label className="text-[10px] mb-1 block">Nombres *</Label>
              <Input
                value={context.nombres}
                onChange={e => update('nombres', e.target.value)}
                className="h-7 text-xs"
                placeholder="Ej: Maria Fernanda"
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 block">Apellidos *</Label>
              <Input
                value={context.apellidos}
                onChange={e => update('apellidos', e.target.value)}
                className="h-7 text-xs"
                placeholder="Ej: Lopez Garcia"
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 block">Email *</Label>
              <Input
                value={context.email}
                onChange={e => update('email', e.target.value)}
                className="h-7 text-xs"
                placeholder="correo@ejemplo.com"
                type="email"
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 block">Codigo</Label>
              <Input
                value={context.codigo}
                onChange={e => update('codigo', e.target.value)}
                className="h-7 text-xs"
                placeholder="20240001"
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-[10px] mb-1 block">Seccion / Grupo</Label>
              <Input
                value={context.seccion}
                onChange={e => update('seccion', e.target.value)}
                className="h-7 text-xs"
                placeholder="Ej: A - Manana"
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
          </div>
        </div>

        {/* Tipo de trabajo - ARREGLADO */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            Tipo de Trabajo *
          </h3>
          <div className="space-y-2.5">
            {/* Individual */}
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                context.esTrabajoIndividual
                  ? 'border-blue-500/40 bg-blue-500/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="tipoTrabajo"
                checked={context.esTrabajoIndividual}
                onChange={() => {
                  update('esTrabajoIndividual', true);
                  update('esTrabajoEnEquipo', false);
                  update('numeroIntegrantes', 1);
                }}
                className="w-4 h-4 accent-primary"
              />
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs font-medium">Trabajo Individual</p>
                  <p className="text-[9px] text-muted-foreground">Soy el unico autor del proyecto</p>
                </div>
              </div>
            </label>

            {/* Equipo */}
            <label
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                context.esTrabajoEnEquipo
                  ? 'border-purple-500/40 bg-purple-500/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <input
                type="radio"
                name="tipoTrabajo"
                checked={context.esTrabajoEnEquipo}
                onChange={() => {
                  update('esTrabajoIndividual', false);
                  update('esTrabajoEnEquipo', true);
                  update('numeroIntegrantes', 2);
                }}
                className="w-4 h-4 accent-primary"
              />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs font-medium">Trabajo en Equipo</p>
                  <p className="text-[9px] text-muted-foreground">Somos varios integrantes colaborando</p>
                </div>
              </div>
            </label>

            {/* Campos adicionales para equipo */}
            {context.esTrabajoEnEquipo && (
              <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-2.5">
                <div>
                  <Label className="text-[10px] mb-1 block">Numero de integrantes</Label>
                  <Input
                    type="number"
                    min={2}
                    max={10}
                    value={context.numeroIntegrantes}
                    onChange={e => update('numeroIntegrantes', parseInt(e.target.value) || 2)}
                    className="h-7 text-xs"
                    readOnly={!isEditing}
                    style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
                  />
                </div>
                <div>
                  <Label className="text-[10px] mb-1 block">Nombres y apellidos de los integrantes</Label>
                  <Textarea
                    value={context.nombresIntegrantes}
                    onChange={e => update('nombresIntegrantes', e.target.value)}
                    className="text-xs min-h-[60px]"
                    placeholder="1. Juan Perez&#10;2. Ana Garcia&#10;3. ..."
                    readOnly={!isEditing}
                    style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
                  />
                </div>
              </div>
            )}

            {/* Badge de estado */}
            {!isEditing && (
              <div className="flex items-center gap-2 pt-1">
                {context.esTrabajoIndividual ? (
                  <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400 bg-blue-500/10">
                    <User className="w-2.5 h-2.5 mr-1" />
                    Individual
                  </Badge>
                ) : context.esTrabajoEnEquipo ? (
                  <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-400 bg-purple-500/10">
                    <Users className="w-2.5 h-2.5 mr-1" />
                    Equipo ({context.numeroIntegrantes} integrantes)
                  </Badge>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Contexto tematico */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Contexto del Proyecto
          </h3>
          <div className="space-y-2.5">
            <div>
              <Label className="text-[10px] mb-1 flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5" />
                Contexto Tematico *
              </Label>
              <Textarea
                value={context.contextoTematico}
                onChange={e => update('contextoTematico', e.target.value)}
                className="text-xs min-h-[50px]"
                placeholder="Describe el tema central del proyecto..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" />
                Contexto Espacial *
              </Label>
              <Textarea
                value={context.contextoEspacial}
                onChange={e => update('contextoEspacial', e.target.value)}
                className="text-xs min-h-[50px]"
                placeholder="Describe el entorno/espacio donde se desarrolla..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                Contexto Temporal *
              </Label>
              <Textarea
                value={context.contextoTemporal}
                onChange={e => update('contextoTemporal', e.target.value)}
                className="text-xs min-h-[50px]"
                placeholder="Describe la epoca/momento temporal..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
          </div>
        </div>

        {/* Titulo y descripcion */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
            Informacion del Proyecto
          </h3>
          <div className="space-y-2">
            <div>
              <Label className="text-[10px] mb-1 block">Titulo del Proyecto *</Label>
              <Input
                value={context.tituloProyecto}
                onChange={e => update('tituloProyecto', e.target.value)}
                className="h-7 text-xs font-medium"
                placeholder="Titulo de la infografia EPUB3..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 block">Descripcion</Label>
              <Textarea
                value={context.descripcionProyecto}
                onChange={e => update('descripcionProyecto', e.target.value)}
                className="text-xs min-h-[50px]"
                placeholder="Describe el proyecto..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
            <div>
              <Label className="text-[10px] mb-1 block">Publico Objetivo</Label>
              <Input
                value={context.publicoObjetivo}
                onChange={e => update('publicoObjetivo', e.target.value)}
                className="h-7 text-xs"
                placeholder="Ej: Ninos de 8-12 anos..."
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? undefined : 'rgba(255,255,255,0.03)' }}
              />
            </div>
          </div>
        </div>

        {/* Dimensiones del simbolismo de espacio */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Dimensiones del Simbolismo de Espacio
          </h3>
          <p className="text-[9px] text-muted-foreground mb-2">
            Selecciona las dimensiones que usaras:
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {spaceDimensions.map(dim => {
              const isSelected = context.dimensionesSeleccionadas.includes(dim.id);
              return (
                <button
                  key={dim.id}
                  onClick={() => isEditing && toggleDimension(dim.id)}
                  className={`flex items-center gap-1.5 p-1.5 rounded text-[9px] text-left transition-all border ${
                    isSelected
                      ? 'border-white/20 bg-white/10 text-foreground'
                      : 'border-white/5 bg-white/[0.02] text-muted-foreground'
                  } ${isEditing ? 'cursor-pointer hover:border-white/30' : 'cursor-default'}`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dim.color }}
                  />
                  <span className="truncate">{dim.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
