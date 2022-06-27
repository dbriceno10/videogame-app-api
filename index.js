const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    process.env.NODE_ENV === 'production'
      ? console.log('the server is running')
      : console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
