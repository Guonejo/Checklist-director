# Checklist de Transmisiones

Aplicación web para automatizar checklists de transmisiones con dos módulos principales:
- **Checklist de Director**: Para verificar aspectos técnicos de la dirección
- **Checklist de Gráficas**: Para verificar elementos gráficos de la transmisión

## Características

- 🎯 Menú principal para seleccionar el tipo de checklist
- 📝 Formularios interactivos con campos personalizables
- 📄 Generación de PDFs con los datos completados
- 🎨 Interfaz moderna y responsiva
- ⚡ Construida con React + TypeScript + Vite

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter

## Uso

1. Selecciona el tipo de checklist desde el menú principal
2. Completa todos los campos requeridos
3. Haz clic en "Imprimir PDF" para generar el resumen en formato PDF
4. El PDF se descargará automáticamente con los datos completados

## Tecnologías

- React 18
- TypeScript
- Vite
- React Router
- jsPDF (para generación de PDFs)
- CSS3

