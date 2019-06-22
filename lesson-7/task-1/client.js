const net = require('net');
var debug = require('debug')('client');

const filter = {
  address: {
    country: 'Kuwait'
  },
  meta: {
    format: 'csv',
    archive: true
  }
};

const client = net.createConnection({ port: 8080 }, () => {
  // 'connect' listener
  debug('Connected to server!');
  client.write(JSON.stringify(filter));
});

client.on('data', data => {
  console.log(JSON.parse(data));
  client.destroy();
});

client.on('close', () => {
  debug('Connection closed!');
});
