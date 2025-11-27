# Checklist de Transmisiones IUC Viña del Mar

Aplicación web para gestionar checklists de transmisiones en vivo para la Iglesia Unión Cristiana (IUC) Viña del Mar Etchevers.

## 🚀 Características

- **Checklist de Director**: Checklist completo para el director de transmisión
- **Checklist de Gráficas**: Checklist completo para el equipo de gráficas
- **Validación de campos**: Alerta al usuario sobre campos incompletos antes de generar el PDF
- **Generación de PDF**: Exporta el checklist completado como PDF profesional
- **Diseño responsive**: Optimizado para dispositivos móviles y desktop
- **Interfaz moderna**: Diseño atractivo con colores y efectos visuales

## 📋 Requisitos

- Node.js 18 o superior
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/Checklist-director.git
cd Checklist-director
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 📦 Build para producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 🚀 Despliegue en GitHub Pages

### Opción 1: Deploy automático con GitHub Actions (Recomendado)

El proyecto incluye un workflow de GitHub Actions que despliega automáticamente cuando haces push a la rama `main` o `master`.

1. Asegúrate de que tu repositorio esté en GitHub
2. Ve a **Settings** > **Pages** en tu repositorio
3. Selecciona **Source**: `GitHub Actions`
4. Haz push a la rama `main` o `master`
5. El workflow se ejecutará automáticamente y desplegará tu sitio

### Opción 2: Deploy manual con gh-pages

1. Instala gh-pages globalmente:
```bash
npm install -g gh-pages
```

2. Ejecuta el deploy:
```bash
npm run deploy
```

**Nota**: Si tu repositorio tiene un nombre diferente a `Checklist-director`, actualiza el `base` en `vite.config.ts` con el nombre correcto de tu repositorio.

### Configurar el base path

Si tu repositorio tiene un nombre diferente, actualiza `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === 'production' ? '/tu-nombre-repo/' : '/',
```

## 📁 Estructura del proyecto

```
Checklist-director/
├── public/
│   └── img/
│       └── icon iuc.png      # Logo de la iglesia
├── src/
│   ├── components/
│   │   ├── ChecklistDirector.tsx
│   │   ├── ChecklistGraficas.tsx
│   │   ├── MenuPrincipal.tsx
│   │   ├── ModalValidacion.tsx
│   │   └── *.css
│   ├── utils/
│   │   └── pdfGenerator.ts
│   └── ...
└── ...
```

## 🎨 Tecnologías utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación
- **jsPDF** - Generación de PDFs
- **HTML2Canvas** - Captura de elementos HTML

## 📝 Licencia

Este proyecto es privado y está destinado para uso interno de la IUC Viña del Mar Etchevers.

## 👥 Contribuidores

- Desarrollado para IUC Viña del Mar Etchevers
