let express = require('express');
let app = express();

let io = require('socket.io').listen(app.listen(8070, function () {
    console.log(`Node server ejecutandose en http://localhost:8087`)
}));

io.sockets.on('connection', function (socket) {
    socket.emit('status', { message: 'conectado' });

    socket.on('send', function (data) {
        io.sockets.emit('status', { message: data });
    });
});
