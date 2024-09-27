import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../client/src/tests',
  use: {
    headless: false,  
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173/app/products',  // Asegúrate de que coincide con la URL de desarrollo.
    video: 'on',  // Para grabar el test.
    screenshot: 'on',  // Toma capturas de pantalla en caso de fallo.
  },
});
