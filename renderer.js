const electron = require('electron');

const net = electron.remote.net;

let formula = document.querySelector('#formula');
let result = document.querySelector('#result');
formula.addEventListener('input', () => {
    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        path: '/hello',
        port: 8000
    });
    request.on('response', (response) => {
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
        });
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${error}`)
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
})

formula.dispatchEvent(new Event('input'));