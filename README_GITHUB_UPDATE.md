# Como Actualizar la App en GitHub Pages

## Resumen del proceso

Cada vez que haces cambios en el codigo, necesitas:
1. **Build** (compilar) la app
2. **Copiar** la carpeta `dist/` a `docs/`
3. **Subir** los cambios a GitHub
4. **Esperar** 1-2 minutos a que GitHub Pages se actualice

---

## Paso 1: Abrir la terminal

Abre **Git Bash** (recomendado) o la terminal de tu sistema operativo.

Navega a la carpeta de tu proyecto:

```bash
cd /ruta/a/tu/proyecto
```

Por ejemplo, si esta en Descargas:
```bash
cd ~/Downloads/planificador-epub3
```

---

## Paso 2: Hacer el Build

Asegurate de tener Node.js instalado. Luego ejecuta:

```bash
npm install     # Solo si es la primera vez o cambiaste dependencias
npm run build   # Compila la app
```

Si todo sale bien, vera un mensaje como:
```
dist/                     0.45 kB | gzip: 0.32 kB
dist/assets/index-*.css   111.34 kB | gzip: 18.80 kB
dist/assets/index-*.js    513.80 kB | gzip: 139.61 kB
```

Esto crea la carpeta `dist/` con los archivos compilados.

---

## Paso 3: Copiar dist a docs

GitHub Pages lee desde la carpeta `docs/`. Copia el contenido:

```bash
# Borrar la carpeta docs anterior
rm -rf docs

# Copiar la nueva version
cp -r dist docs
```

En Windows (Git Bash o CMD):
```bash
# Borrar docs anterior
rm -rf docs

# Copiar dist a docs
cp -r dist docs
```

O en PowerShell:
```powershell
Remove-Item -Recurse -Force docs
Copy-Item -Recurse dist docs
```

---

## Paso 4: Subir a GitHub

```bash
# Ver que archivos cambiaron
git status

# Agregar todos los cambios
git add .

# Crear un commit con descripcion
git commit -m "v12: Validador EPUB integrado + efectos avanzados"

# Subir a GitHub
git push origin main
```

Si usas otra rama (como `master`):
```bash
git push origin master
```

---

## Paso 5: Verificar en GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings > Pages** (o Configuracion > Paginas)
3. Asegurate de que la fuente sea:
   - **Deploy from a branch**
   - Branch: `main` (o `master`)
   - Folder: `/docs`
4. Espera **1-2 minutos**
5. Recarga tu pagina con **Ctrl + F5** (limpia cache)

---

## Script automatico (opcional)

Puedes crear un archivo `deploy.sh` para automatizar:

```bash
#!/bin/bash
echo "=== Build ==="
npm run build

echo "=== Copiar dist a docs ==="
rm -rf docs
cp -r dist docs

echo "=== Git ==="
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo "=== Listo! Espera 1-2 minutos ==="
```

Para usarlo:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Solucion de problemas

### "No veo los cambios"
- GitHub Pages tarda 1-2 minutos en actualizarse
- Prueba **Ctrl + F5** para limpiar cache del navegador
- Abre en **ventana de incognito**

### "npm run build falla"
```bash
# Borrar todo y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "La pagina se ve en blanco"
- Verifica que `vite.config.ts` tenga `base: './'`
- Asegurate de que `docs/` tenga el archivo `index.html`

### "No tengo la carpeta dist/"
- El build debe completarse sin errores
- Verifica que no haya errores de TypeScript (tsc)

---

## Archivos que necesitas tener en tu repo

```
tu-repo/
  docs/           <-- GitHub Pages lee de aqui
    index.html
    assets/
      index-*.js
      index-*.css
  src/            <-- Tu codigo fuente
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tailwind.config.js
  postcss.config.js
  .gitignore
```

> **IMPORTANTE:** No subas la carpeta `node_modules/` ni `dist/` a GitHub. Solo `docs/` y `src/`.

---

## Comandos rapidos (cheat sheet)

```bash
# Todo en uno
npm run build && rm -rf docs && cp -r dist docs && git add . && git commit -m "update" && git push

# Solo verificar estado
git status

# Ver ultimos commits
git log --oneline -5

# Ver si hay cambios en GitHub
git fetch && git status
```
