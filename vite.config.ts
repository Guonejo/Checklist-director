import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Para GitHub Pages, usa el nombre de tu repositorio como base
// Si tu repo se llama diferente, cambia '/Checklist-director/' por '/tu-nombre-repo/'
export default defineConfig({
  plugins: [react()],
  base: '/Checklist-director/',
})

