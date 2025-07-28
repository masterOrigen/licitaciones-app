const https = require('https');

// Token nuevo proporcionado por el usuario
const token = 'qiZvFWCOiFebsKdbmN6zTWGxsRsxeyX0';
const url = 'https://baserow-production-c519.up.railway.app/api/database/rows/table/699/?user_field_names=true';

console.log('Probando nuevo token de Baserow con URL correcta...');
console.log('URL:', url);
console.log('Token:', token);

const options = {
    method: 'GET',
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
};

const req = https.request(url, options, (res) => {
    console.log('\n--- Respuesta de Baserow ---');
    console.log('Status Code:', res.statusCode);
    console.log('Status Message:', res.statusMessage);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\n--- Contenido de la respuesta ---');
        try {
            const parsed = JSON.parse(data);
            console.log('Respuesta JSON:', JSON.stringify(parsed, null, 2));
            
            if (res.statusCode === 200) {
                console.log('\n✅ TOKEN VÁLIDO - La autenticación fue exitosa');
                console.log('Número de usuarios encontrados:', parsed.results ? parsed.results.length : 0);
            } else {
                console.log('\n❌ TOKEN INVÁLIDO - Error de autenticación');
            }
        } catch (e) {
            console.log('Respuesta no es JSON válido:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('\n❌ Error en la petición:', error.message);
});

req.end(); 