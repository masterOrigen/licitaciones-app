// Configuration file to load environment variables
// In a production environment, these should be loaded from a secure backend
const config = {
    mercadoPublicoApiKey: process.env.MERCADO_PUBLICO_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    baserowApiUrl: process.env.BASEROW_API_URL || '',
    baserowToken: process.env.BASEROW_TOKEN || '',
    baserowMediaApiUrl: process.env.BASEROW_MEDIA_API_URL || '',
    baserowMediaToken: process.env.BASEROW_MEDIA_TOKEN || ''
};

// For client-side applications, you might want to use a build tool like Webpack or Vite
// to inject environment variables at build time
export default config;