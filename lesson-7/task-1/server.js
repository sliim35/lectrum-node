const net = require('net');
const fs = require('fs');
const path = require('path');
var debug = require('debug')('client');

const server = net.createServer();
const PORT = process.env.PORT || 8080;

server.on('connection', socket => {
  debug('New client connected!');

  socket.on('data', msg => {
    fs.readFile(
      path.join('../data', 'users.json'),
      'utf8',
      (err, users) => {
        if (err) throw err;

        const filter = JSON.parse(msg);

        const reducer = (filtered, currentUser) => {
          if (
            currentUser.phone.includes(
              filter.phone || ''
            ) &&
            currentUser.email.includes(
              filter.email || ''
            ) &&
            currentUser.name.first.includes(
              (filter['name'] || {}).first || ''
            ) &&
            currentUser.name.last.includes(
              (filter['name'] || {}).last || ''
            ) &&
            currentUser.address.zip.includes(
              (filter['address'] || {}).zip || ''
            ) &&
            currentUser.address.city.includes(
              (filter['address'] || {}).city || ''
            ) &&
            currentUser.address.country.includes(
              (filter['address'] || {}).country || ''
            ) &&
            currentUser.address.street.includes(
              (filter['address'] || {}).street || ''
            )
          ) {
            filtered.push(currentUser);
          }

          return filtered;
        };

        const filteredUsers = JSON.parse(users).reduce(
          reducer,
          []
        );

        socket.write(JSON.stringify(filteredUsers));
      }
    );
  });

  socket.on('end', () => {
    debug('Client is disconnected!');
  });
});

server.on('listening', () => {
  const { port } = server.address();
  debug(`TCP Server started on port ${port}!`);
});

server.listen(PORT);
