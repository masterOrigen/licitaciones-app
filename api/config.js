// API endpoint para exponer variables de entorno en Railway
// Este archivo debe ser servido por un servidor Node.js en Railway

module.exports = (req, res) => {
    // Configurar CORS para permitir requests desde el frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Solo permitir método GET
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    try {
        // Obtener variables de entorno de Railway
        const config = {
            baserowUsersApiUrl: process.env.BASEROW_USERS_API_URL || 'https://api.baserow.io/api/database/rows/table/699/?user_field_names=true',
            baserowUsersToken: process.env.BASEROW_USERS_TOKEN || '',
            baserowApiUrl: process.env.BASEROW_API_URL || 'https://api.baserow.io/api/database/rows/table/697/?user_field_names=true',
            baserowToken: process.env.BASEROW_TOKEN || '',
            baserowMediaApiUrl: process.env.BASEROW_MEDIA_API_URL || 'https://api.baserow.io/api/database/rows/table/698/?user_field_names=true',
            baserowMediaToken: process.env.BASEROW_MEDIA_TOKEN || ''
        };
        
        // Verificar que las variables críticas estén configuradas
        if (!config.baserowUsersToken) {
            res.status(500).json({ 
                error: 'Variables de entorno no configuradas correctamente',
                message: 'BASEROW_USERS_TOKEN no está definido'
            });
            return;
        }
        
        res.status(200).json(config);
    } catch (error) {
        console.error('Error en /api/config:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
};