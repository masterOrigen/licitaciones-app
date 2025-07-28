const https = require('https');

const token = 'qiZvFWCOiFebsKdbmN6zTWGxsRsxeyX0';

// Probar diferentes endpoints para verificar el token - ACTUALIZADAS CON RAILWAY
const endpoints = [
    'https://baserow-production-c519.up.railway.app/api/database/rows/table/697/?user_field_names=true',
    'https://baserow-production-c519.up.railway.app/api/database/rows/table/698/?user_field_names=true',
    'https://baserow-production-c519.up.railway.app/api/database/rows/table/699/?user_field_names=true'
];

async function testEndpoint(url, description) {
    return new Promise((resolve) => {
        console.log(`\n🔍 Probando: ${description}`);
        console.log(`URL: ${url}`);
        
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(url, options, (res) => {
            console.log(`Status: ${res.statusCode} - ${res.statusMessage}`);
            
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode === 200) {
                        console.log('✅ ÉXITO');
                        console.log('Respuesta:', JSON.stringify(parsed, null, 2));
                    } else {
                        console.log('❌ ERROR');
                        console.log('Error:', parsed);
                    }
                } catch (e) {
                    console.log('❌ Respuesta no es JSON:', data);
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.log('❌ Error de conexión:', error.message);
            resolve();
        });

        req.end();
    });
}

async function runTests() {
    console.log('🚀 Iniciando pruebas de token con Railway...\n');
    
    await testEndpoint(endpoints[0], 'Tabla 697 (datos principales)');
    await testEndpoint(endpoints[1], 'Tabla 698 (media)');
    await testEndpoint(endpoints[2], 'Tabla 699 (usuarios)');
    
    console.log('\n✨ Pruebas completadas');
}

runTests(); 