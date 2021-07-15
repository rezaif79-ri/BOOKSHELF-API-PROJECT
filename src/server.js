const hapi = require('@hapi/hapi');

const init = async function() {
    let server = hapi.server({
        port: 8000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes:{
            cors:{
                origin: ['*'],
            }
        }
    })

    server.routes();
    await server.start();

    console.log(`Server running on ${server.info.uri}`);
}
