const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
    client.on('message', message => {
        console.log(`message: ${message} from client ${client.id}`);

        client.emit('welcome', 'Hello my Friend!');

        setInterval(() => {
            client.emit('uptime', process.uptime());
        }, 20);
    });

    client.on('disconnect', () => {
        console.log(`Client ${client.id} disconnected!`);
    });
});

server.listen(3000);
