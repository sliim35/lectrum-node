const events = jest.genMockFromModule('events');

events.on = (error, cb) => {
  cb(new Error('error'));
};

events.emit = ('error', new Error('error'));

module.exports = events;
