const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Función para cargar configuración desde config.json
function loadConfigFromFile() {
    try {
        const configPath = path.join(__dirname, 'config.json');
        if (fs.existsSync(configPath)) {
            const configFile = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(configFile);
        }
        return null;
    } catch (error) {
        console.error('Error leyendo config.json:', error);
        return null;
    }
}

// Endpoint para configuración (variables de entorno con fallback a config.json)
app.get('/api/config', (req, res) => {
    try {
        // Primero intentar variables de entorno
        let config = {
            baserowUsersApiUrl: process.env.BASEROW_USERS_API_URL,
            baserowUsersToken: process.env.BASEROW_USERS_TOKEN,
            baserowApiUrl: process.env.BASEROW_API_URL,
            baserowToken: process.env.BASEROW_TOKEN,
            baserowMediaApiUrl: process.env.BASEROW_MEDIA_API_URL,
            baserowMediaToken: process.env.BASEROW_MEDIA_TOKEN
        };
        
        // Si no hay variables de entorno, usar config.json
        if (!config.baserowUsersToken) {
            console.log('Variables de entorno no encontradas, usando config.json');
            const fileConfig = loadConfigFromFile();
            if (fileConfig) {
                config = {
                    baserowUsersApiUrl: fileConfig.baserowUsersApiUrl || 'https://api.baserow.io/api/database/rows/table/699/?user_field_names=true',
                    baserowUsersToken: fileConfig.baserowUsersToken || '',
                    baserowApiUrl: fileConfig.baserowApiUrl || 'https://api.baserow.io/api/database/rows/table/697/?user_field_names=true',
                    baserowToken: fileConfig.baserowToken || '',
                    baserowMediaApiUrl: fileConfig.baserowMediaApiUrl || 'https://api.baserow.io/api/database/rows/table/698/?user_field_names=true',
                    baserowMediaToken: fileConfig.baserowMediaToken || ''
                };
            }
        } else {
            // Usar valores por defecto si las variables están definidas pero vacías
            config.baserowUsersApiUrl = config.baserowUsersApiUrl || 'https://api.baserow.io/api/database/rows/table/699/?user_field_names=true';
            config.baserowApiUrl = config.baserowApiUrl || 'https://api.baserow.io/api/database/rows/table/697/?user_field_names=true';
            config.baserowMediaApiUrl = config.baserowMediaApiUrl || 'https://api.baserow.io/api/database/rows/table/698/?user_field_names=true';
        }
        
        // Verificar que las variables críticas estén configuradas
        if (!config.baserowUsersToken) {
            return res.status(500).json({ 
                error: 'Configuración no disponible',
                message: 'No se pudo cargar la configuración desde variables de entorno ni desde config.json'
            });
        }
        
        console.log('Configuración cargada exitosamente:', {
            hasUsersToken: !!config.baserowUsersToken,
            hasToken: !!config.baserowToken,
            hasMediaToken: !!config.baserowMediaToken,
            source: process.env.BASEROW_USERS_TOKEN ? 'variables de entorno' : 'config.json'
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