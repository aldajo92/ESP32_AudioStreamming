const net = require('net');
const os = require('os');

const esp32Port = 3001;
const clientPort = 3002;

const serverEsp32 = net.createServer(socket => {
    console.log('ESP32 connected');

    socket.on('error', error => {
        console.error('ESP32 socket error: ', error);
    });

    socket.on('data', data => {
        console.log('Received data from ESP32');

        // Send the audio data to the client
        clientSocket.write(data);
    });

    socket.on('end', () => {
        console.log('ESP32 disconnected');
    });
});

const serverClient = net.createServer(socket => {
    console.log('Client connected');

    socket.on('error', error => {
        console.error('Client socket error: ', error);
    });
});

serverEsp32.listen(esp32Port, () => {
    console.log('Server listening on ESP32 port: ', esp32Port);

    // Get the IP address of the server
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    // Log the IP addresses of the server
    console.log('Server IP addresses: ', addresses);
});

serverClient.listen(clientPort, () => {
    console.log('Server listening on client port: ', clientPort);
});

// Create a variable to hold the client socket
let clientSocket;

// Listen for a client to connect
serverClient.on('connection', socket => {
    console.log('Client connected');

    // Save the client socket
    clientSocket = socket;

    socket.on('error', error => {
        console.error('Client socket error: ', error);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});
