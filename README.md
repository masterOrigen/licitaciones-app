# Sistema de Decisión Estratégica para Licitaciones

## Despliegue en Railway

### Variables de Entorno Requeridas

Para que la aplicación funcione correctamente en Railway, debes configurar las siguientes variables de entorno:

```
BASEROW_API_URL=https://api.baserow.io/api/database/rows/table/697/?user_field_names=true
BASEROW_TOKEN=tu_token_de_baserow_aqui
BASEROW_MEDIA_API_URL=https://api.baserow.io/api/database/rows/table/698/?user_field_names=true
BASEROW_MEDIA_TOKEN=tu_token_de_baserow_aqui
BASEROW_USERS_API_URL=https://api.baserow.io/api/database/rows/table/699/?user_field_names=true
BASEROW_USERS_TOKEN=tu_token_de_baserow_aqui
```

### Pasos para Desplegar

1. **Conecta tu repositorio a Railway**
   - Ve a [Railway.app](https://railway.app)
   - Conecta tu repositorio de GitHub

2. **Configura las Variables de Entorno**
   - En el dashboard de Railway, ve a la pestaña "Variables"
   - Agrega cada una de las variables listadas arriba
   - Usa el token que viste en las variables de entorno: `p5V4Wy1TfWnHMBtFGQoiRXDhLjEkA8Oc`

3. **Despliega la Aplicación**
   - Railway detectará automáticamente el `package.json`
   - Ejecutará `npm install` y luego `npm start`
   - El servidor se iniciará en el puerto asignado por Railway

### Cómo Funciona

- **Desarrollo Local**: La aplicación carga la configuración desde `config.json`
- **Producción (Railway)**: La aplicación carga la configuración desde las variables de entorno a través del endpoint `/api/config`

### Estructura del Proyecto

```
├── server.js              # Servidor Express principal
├── package.json           # Dependencias y scripts
├── config.json           # Configuración para desarrollo local
├── login.html            # Página de login
├── index.html            # Página principal
├── api/
│   └── config.js         # Endpoint para variables de entorno
└── README.md             # Este archivo
```

### Solución de Problemas

**Error HTTP 401**: 
- Verifica que las variables de entorno estén configuradas correctamente en Railway
- Asegúrate de que el token de Baserow sea válido y no haya expirado
- Revisa los logs de Railway para más detalles

**La aplicación no carga**:
- Verifica que el puerto esté configurado correctamente (Railway asigna automáticamente)
- Revisa que todas las dependencias estén en `package.json`

### Variables de Entorno en Railway

Basándote en la imagen que proporcionaste, debes configurar:

- `BASEROW_USERS_TOKEN` = `p5V4Wy1TfWnHMBtFGQoiRXDhLjEkA8Oc`
- `BASEROW_TOKEN` = `qIZvFWCOiFebsKdbmNGzTWGxsRsxeyXQ` (del token que viste)
- `BASEROW_MEDIA_TOKEN` = `qIZvFWCOiFebsKdbmNGzTWGxsRsxeyXQ`

Y las URLs correspondientes para cada tabla de Baserow.