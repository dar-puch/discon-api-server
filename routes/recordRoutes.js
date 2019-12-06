const recordsRoutes = (app, fs) => {

  const dataPath = './dane.json';

  app.get('/records', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      console.log('file data: ', data);
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
};

module.exports = recordsRoutes;