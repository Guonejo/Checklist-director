# Guía de Despliegue en GitHub Pages

## 📋 Pasos para desplegar

### 1. Preparar el repositorio en GitHub

1. Crea un nuevo repositorio en GitHub (si aún no lo tienes)
2. El nombre del repositorio será parte de la URL: `https://tu-usuario.github.io/Checklist-director/`
3. Si usas un nombre diferente, actualiza `vite.config.ts` con el nombre correcto

### 2. Configurar el repositorio local

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar el repositorio remoto
git remote add origin https://github.com/tu-usuario/Checklist-director.git

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: Checklist de Transmisiones IUC"

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages

#### Opción A: Deploy automático con GitHub Actions (Recomendado)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. Guarda los cambios
6. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente en cada push a `main`

#### Opción B: Deploy manual con gh-pages

1. Instala gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Ejecuta el deploy:
```bash
npm run deploy
```

3. Ve a **Settings** > **Pages** en GitHub
4. Selecciona la rama `gh-pages` como fuente
5. Guarda los cambios

### 4. Verificar el despliegue

- Tu sitio estará disponible en: `https://tu-usuario.github.io/Checklist-director/`
- Puede tardar unos minutos en estar disponible después del primer deploy

## ⚙️ Configuración del base path

Si tu repositorio tiene un nombre diferente a `Checklist-director`, actualiza el archivo `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/tu-nombre-repo/',  // Cambia esto por el nombre de tu repo
})
```

## 🔄 Actualizar el sitio

Cada vez que hagas cambios:

1. Haz commit de tus cambios:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

2. Si usas GitHub Actions, el deploy será automático
3. Si usas gh-pages, ejecuta:
```bash
npm run deploy
```

## 🐛 Solución de problemas

### Las rutas no funcionan al recargar la página

- Asegúrate de que el `base` en `vite.config.ts` coincida con el nombre de tu repositorio
- Verifica que el workflow de GitHub Actions se haya ejecutado correctamente

### Los assets no se cargan

- Verifica que la carpeta `public/` esté incluida en el build
- Asegúrate de que las rutas de imágenes usen rutas relativas o absolutas con el base path

### El workflow falla

- Revisa los logs en la pestaña **Actions** de tu repositorio
- Verifica que Node.js 18 esté disponible
- Asegúrate de que todos los archivos necesarios estén en el repositorio

## 📝 Notas importantes

- El primer deploy puede tardar varios minutos
- GitHub Pages es gratuito para repositorios públicos
- Para repositorios privados, necesitas GitHub Pro
- Los cambios pueden tardar 1-2 minutos en reflejarse después del deploy

