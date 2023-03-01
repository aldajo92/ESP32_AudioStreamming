const net = require('net');
const Speaker = require('speaker');

const client = new net.Socket();


client.connect(8081, '192.168.1.30', () => {
    console.log('Connected to the server');

    let speaker

    client.on('data', data => {
        if (!speaker) {
            speaker = new Speaker({
                channels: 2,
                bitDepth: 16,
                sampleRate: 2250
            });
        }
        speaker.write(data);
    });

    client.on('close', () => {
        console.log('Connection closed');
        if (speaker) {
            speaker.end();
        }
    });
});