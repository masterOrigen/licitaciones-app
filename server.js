const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Endpoint para configuración (variables de entorno)
app.get('/api/config', (req, res) => {
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
            return res.status(500).json({ 
                error: 'Variables de entorno no configuradas correctamente',
                message: 'BASEROW_USERS_TOKEN no está definido'
            });
        }
        
        console.log('Configuración solicitada:', {
            hasUsersToken: !!config.baserowUsersToken,
            hasToken: !!config.baserowToken,
            hasMediaToken: !!config.baserowMediaToken
        });
        
        res.json(config);
    } catch (error) {
        console.error('Error en /api/config:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: error.message 
        });
    }
});

// Servir archivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Catch-all para servir archivos estáticos
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
    console.log('Variables de entorno disponibles:');
    console.log('- BASEROW_USERS_TOKEN:', !!process.env.BASEROW_USERS_TOKEN);
    console.log('- BASEROW_TOKEN:', !!process.env.BASEROW_TOKEN);
    console.log('- BASEROW_MEDIA_TOKEN:', !!process.env.BASEROW_MEDIA_TOKEN);
});